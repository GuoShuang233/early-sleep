import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

let db: SQLite.SQLiteDatabase | null = null;

export async function getDatabase() {
  if (db) return db;
  db = await SQLite.openDatabase({
    name: 'earlysleep.db',
    location: 'default',
  });
  await initTables(db);
  return db;
}

async function initTables(database: SQLite.SQLiteDatabase) {
  await database.executeSql(`
    CREATE TABLE IF NOT EXISTS sleep_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      log_date TEXT NOT NULL UNIQUE,
      bedtime TEXT,
      waketime TEXT,
      phone_curfew_kept INTEGER DEFAULT 0,
      mood INTEGER DEFAULT 3,
      note TEXT DEFAULT '',
      created_at TEXT DEFAULT (datetime('now','localtime'))
    )
  `);

  await database.executeSql(`
    CREATE TABLE IF NOT EXISTS curfew_violations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      log_date TEXT NOT NULL,
      violation_time TEXT NOT NULL,
      app_name TEXT DEFAULT ''
    )
  `);

  await database.executeSql(`
    CREATE TABLE IF NOT EXISTS user_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    )
  `);

  // Insert default settings if not exists
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
) {
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
}

export async function logWaketime(date: string, time: string) {
  const database = await getDatabase();
  await database.executeSql(
    `UPDATE sleep_logs SET waketime = ? WHERE log_date = ?`,
    [time, date],
  );
}

export async function getTodayLog(date: string) {
  const database = await getDatabase();
  const [results] = await database.executeSql(
    `SELECT * FROM sleep_logs WHERE log_date = ?`,
    [date],
  );
  return results.rows.length > 0 ? results.rows.item(0) : null;
}

export async function getRecentLogs(limit = 14) {
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
}

export async function getStreak() {
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
  const todayStr = today.toISOString().slice(0, 10);

  // Current streak: consecutive days from today backwards
  let current = 0;
  let checkDate = new Date(today);
  for (const log of logs) {
    const logDate = new Date(log.log_date + 'T00:00:00');
    const diffDays = Math.round(
      (checkDate.getTime() - logDate.getTime()) / (1000 * 60 * 60 * 24),
    );
    if (diffDays === current) {
      current++;
    } else if (diffDays > current) {
      break;
    }
  }

  // Longest streak
  const dates = logs
    .map((l: any) => l.log_date)
    .sort()
    .reverse();
  let longest = 0;
  let run = 0;
  let prevDate: Date | null = null;
  for (const d of [...dates].reverse()) {
    const dt = new Date(d + 'T00:00:00');
    if (prevDate) {
      const diff = Math.round(
        (dt.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24),
      );
      if (diff === 1) {
        run++;
      } else {
        run = 1;
      }
    } else {
      run = 1;
    }
    prevDate = dt;
    longest = Math.max(longest, run);
  }

  const total = logs.length;
  const curfewOk = logs.filter((l: any) => l.phone_curfew_kept).length;
  const curfewRate = total > 0 ? Math.round((curfewOk / total) * 100) : 0;

  return { current, longest, total, curfewRate };
}

// ── Settings ──────────────────────────────────────────────

export async function getSetting(key: string): Promise<string | null> {
  const database = await getDatabase();
  const [results] = await database.executeSql(
    `SELECT value FROM user_settings WHERE key = ?`,
    [key],
  );
  return results.rows.length > 0 ? results.rows.item(0).value : null;
}

export async function setSetting(key: string, value: string) {
  const database = await getDatabase();
  await database.executeSql(
    `INSERT OR REPLACE INTO user_settings (key, value) VALUES (?, ?)`,
    [key, value],
  );
}
