import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

let db: SQLite.SQLiteDatabase | null = null;

export async function getDatabase() {
  if (db) return db;
  try {
    db = await SQLite.openDatabase({
      name: 'earlysleep.db',
      location: 'default',
    });
    await initTables(db);
    return db;
  } catch (e) {
    console.error('Failed to open database', e);
    throw e;
  }
}

async function initTables(database: SQLite.SQLiteDatabase) {
  await database.executeSql(`
    CREATE TABLE IF NOT EXISTS sleep_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      log_date TEXT NOT NULL UNIQUE,
      bedtime TEXT,
      waketime TEXT,
      phone_curfew_kept INTEGER DEFAULT 0,
      note TEXT DEFAULT '',
      created_at TEXT DEFAULT (datetime('now','localtime'))
    )
  `);

  await database.executeSql(`
    CREATE TABLE IF NOT EXISTS user_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    )
  `);

  await database.executeSql(`
    INSERT OR IGNORE INTO user_settings (key, value) VALUES ('target_bedtime', '23:00')
  `);
  await database.executeSql(`
    INSERT OR IGNORE INTO user_settings (key, value) VALUES ('target_waketime', '07:30')
  `);
}

// ── Sleep Logs ────────────────────────────────────────────

export async function logBedtime(
  date: string,
  time: string,
  curfewKept: boolean,
  note: string,
): Promise<boolean> {
  try {
    const database = await getDatabase();
    await database.executeSql(
      `INSERT INTO sleep_logs (log_date, bedtime, phone_curfew_kept, note)
       VALUES (?, ?, ?, ?)
       ON CONFLICT(log_date) DO UPDATE SET
         bedtime = excluded.bedtime,
         phone_curfew_kept = excluded.phone_curfew_kept,
         note = excluded.note`,
      [date, time, curfewKept ? 1 : 0, note],
    );
    return true;
  } catch (e) {
    console.error('logBedtime failed', e);
    return false;
  }
}

export async function logWaketime(date: string, time: string): Promise<boolean> {
  try {
    const database = await getDatabase();
    // Check if a bedtime record exists first
    const [existing] = await database.executeSql(
      `SELECT id FROM sleep_logs WHERE log_date = ?`,
      [date],
    );
    if (existing.rows.length === 0) {
      // Auto-create a record so waketime can be saved
      await logBedtime(date, '--:--', true, '');
    }
    const [result] = await database.executeSql(
      `UPDATE sleep_logs SET waketime = ? WHERE log_date = ?`,
      [time, date],
    );
    return (result as any).rowsAffected > 0;
  } catch (e) {
    console.error('logWaketime failed', e);
    return false;
  }
}

export async function getTodayLog(date: string) {
  try {
    const database = await getDatabase();
    const [results] = await database.executeSql(
      `SELECT * FROM sleep_logs WHERE log_date = ?`,
      [date],
    );
    return results.rows.length > 0 ? results.rows.item(0) : null;
  } catch (e) {
    console.error('getTodayLog failed', e);
    return null;
  }
}

export async function getRecentLogs(limit = 14) {
  try {
    const database = await getDatabase();
    const [results] = await database.executeSql(
      `SELECT * FROM sleep_logs ORDER BY log_date DESC LIMIT ?`,
      [limit],
    );
    const logs = [];
    for (let i = 0; i < results.rows.length; i++) {
      logs.push(results.rows.item(i));
    }
    return logs;
  } catch (e) {
    console.error('getRecentLogs failed', e);
    return [];
  }
}

export async function getStreak() {
  try {
    const database = await getDatabase();
    const [results] = await database.executeSql(
      `SELECT * FROM sleep_logs WHERE bedtime IS NOT NULL ORDER BY log_date DESC`,
    );
    const logs = [];
    for (let i = 0; i < results.rows.length; i++) {
      logs.push(results.rows.item(i));
    }

    if (logs.length === 0) {
      return { current: 0, longest: 0, total: 0, curfewRate: 0 };
    }

    const today = new Date();
    // Use UTC-based comparison to avoid timezone issues
    const todayTs = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());

    // Current streak: consecutive days from today backwards
    let current = 0;
    let checkTs = todayTs;
    for (const log of logs) {
      const parts = log.log_date.split('-').map(Number);
      const logTs = Date.UTC(parts[0], parts[1] - 1, parts[2]);
      const diffDays = Math.round((checkTs - logTs) / 86400000);
      if (diffDays === current) {
        current++;
      } else if (diffDays > current) {
        break;
      }
    }

    // Longest streak via sorted dates
    const sortedDates = logs
      .map((l: any) => l.log_date)
      .sort();
    let longest = 0;
    let run = 1;
    for (let i = 1; i < sortedDates.length; i++) {
      const prev = sortedDates[i - 1].split('-').map(Number);
      const curr = sortedDates[i].split('-').map(Number);
      const prevTs = Date.UTC(prev[0], prev[1] - 1, prev[2]);
      const currTs = Date.UTC(curr[0], curr[1] - 1, curr[2]);
      if ((currTs - prevTs) / 86400000 === 1) {
        run++;
      } else {
        run = 1;
      }
      longest = Math.max(longest, run);
    }
    if (sortedDates.length === 1) longest = 1;

    const total = logs.length;
    const curfewOk = logs.filter((l: any) => l.phone_curfew_kept).length;
    const curfewRate = total > 0 ? Math.round((curfewOk / total) * 100) : 0;

    return { current, longest, total, curfewRate };
  } catch (e) {
    console.error('getStreak failed', e);
    return { current: 0, longest: 0, total: 0, curfewRate: 0 };
  }
}

// ── Settings ──────────────────────────────────────────────

export async function getSetting(key: string): Promise<string | null> {
  try {
    const database = await getDatabase();
    const [results] = await database.executeSql(
      `SELECT value FROM user_settings WHERE key = ?`,
      [key],
    );
    return results.rows.length > 0 ? results.rows.item(0).value : null;
  } catch (e) {
    console.error('getSetting failed', e);
    return null;
  }
}

export async function setSetting(key: string, value: string): Promise<boolean> {
  try {
    const database = await getDatabase();
    await database.executeSql(
      `INSERT OR REPLACE INTO user_settings (key, value) VALUES (?, ?)`,
      [key, value],
    );
    return true;
  } catch (e) {
    console.error('setSetting failed', e);
    return false;
  }
}
