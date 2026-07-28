import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);
let db: SQLite.SQLiteDatabase | null = null;

export async function getDatabase() {
  if (db) return db;
  try {
    db = await SQLite.openDatabase({ name: 'earlysleep.db', location: 'default' });
    await initTables(db);
    return db;
  } catch (e) { console.error('Failed to open database', e); throw e; }
}

async function initTables(database: SQLite.SQLiteDatabase) {
  await database.executeSql(`CREATE TABLE IF NOT EXISTS sleep_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT, log_date TEXT NOT NULL UNIQUE,
    bedtime TEXT, waketime TEXT, phone_curfew_kept INTEGER DEFAULT 0,
    note TEXT DEFAULT '', created_at TEXT DEFAULT (datetime('now','localtime')))`);
  await database.executeSql(`CREATE TABLE IF NOT EXISTS user_settings (
    key TEXT PRIMARY KEY, value TEXT NOT NULL)`);
  await database.executeSql("INSERT OR IGNORE INTO user_settings (key, value) VALUES ('target_bedtime', '23:00')");
  await database.executeSql("INSERT OR IGNORE INTO user_settings (key, value) VALUES ('target_waketime', '07:30')");
}

export async function logBedtime(date: string, time: string, curfewKept: boolean, note: string): Promise<boolean> {
  try {
    const database = await getDatabase();
    await database.executeSql(
      `INSERT INTO sleep_logs (log_date, bedtime, phone_curfew_kept, note) VALUES (?,?,?,?) ON CONFLICT(log_date) DO UPDATE SET bedtime=excluded.bedtime, phone_curfew_kept=excluded.phone_curfew_kept, note=excluded.note`,
      [date, time, curfewKept ? 1 : 0, note]);
    return true;
  } catch (e) { console.error('logBedtime failed', e); return false; }
}

export async function logWaketime(date: string, time: string): Promise<boolean> {
  try {
    const database = await getDatabase();
    const [existing] = await database.executeSql(`SELECT id FROM sleep_logs WHERE log_date=?`, [date]);
    if (existing.rows.length === 0) await logBedtime(date, '--:--', true, '');
    await database.executeSql(`UPDATE sleep_logs SET waketime=? WHERE log_date=?`, [time, date]);
    return true;
  } catch (e) { console.error('logWaketime failed', e); return false; }
}

export async function getTodayLog(date: string) {
  try {
    const database = await getDatabase();
    const [r] = await database.executeSql(`SELECT * FROM sleep_logs WHERE log_date=?`, [date]);
    return r.rows.length > 0 ? r.rows.item(0) : null;
  } catch (e) { console.error(e); return null; }
}

export async function getRecentLogs(limit = 14) {
  try {
    const database = await getDatabase();
    const [r] = await database.executeSql(`SELECT * FROM sleep_logs ORDER BY log_date DESC LIMIT ?`, [limit]);
    const logs = []; for (let i = 0; i < r.rows.length; i++) logs.push(r.rows.item(i));
    return logs;
  } catch (e) { console.error(e); return []; }
}

function timeToMinutes(t: string): number {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

function isValidSleepLog(log: any, targetBed: string, targetWake: string): boolean {
  if (!log.bedtime || !log.waketime) return false;
  // Sleep duration must be >= 1 hour
  const bedMin = timeToMinutes(log.bedtime);
  let wakeMin = timeToMinutes(log.waketime);
  // If waketime is earlier than bedtime, it crosses midnight
  if (wakeMin < bedMin) wakeMin += 24 * 60;
  const durationMin = wakeMin - bedMin;
  if (durationMin < 60) return false;
  // Bedtime must be within 2 hours of target
  const targetMin = timeToMinutes(targetBed);
  const diff = Math.abs(bedMin - targetMin);
  // Handle midnight crossing
  const diffWrap = Math.min(diff, 24 * 60 - diff);
  return diffWrap <= 120; // within 2 hours
}

export async function getStreak(targetBed?: string, targetWake?: string) {
  try {
    const tb = targetBed || (await getSetting('target_bedtime')) || '23:00';
    const tw = targetWake || (await getSetting('target_waketime')) || '07:30';
    const database = await getDatabase();
    const [r] = await database.executeSql(
      `SELECT * FROM sleep_logs WHERE bedtime IS NOT NULL ORDER BY log_date DESC`);
    const logs = []; for (let i = 0; i < r.rows.length; i++) logs.push(r.rows.item(i));
    if (logs.length === 0) return { current: 0, longest: 0, total: 0, curfewRate: 0 };

    // Filter to valid sleep logs only
    const valid = logs.filter((l: any) => isValidSleepLog(l, tb, tw));
    const curfewOk = valid.filter((l: any) => l.phone_curfew_kept).length;

    // Current streak on valid logs
    let current = 0;
    const today = new Date();
    const todayStr = today.getFullYear()+'-'+String(today.getMonth()+1).padStart(2,'0')+'-'+String(today.getDate()).padStart(2,'0');
    for (const log of valid) {
      if (log.log_date === todayStr) { current = 1; break; }
    }
    // Count consecutive days backwards
    if (current > 0 && valid.length > 1) {
      const prevDate = new Date(today); prevDate.setDate(prevDate.getDate() - 1);
      const prevStr = prevDate.getFullYear()+'-'+String(prevDate.getMonth()+1).padStart(2,'0')+'-'+String(prevDate.getDate()).padStart(2,'0');
      for (let i = 1; i < valid.length; i++) {
        if (valid[i].log_date === prevStr) {
          current++;
          const d = new Date(prevStr + 'T00:00:00'); d.setDate(d.getDate() - 1);
          // update prevStr for next iteration
          const prevDate2 = d;
          // Simple: just check next in sequence
        } else {
          break;
        }
      }
    }

    // Longest streak (same logic over all valid logs sorted chronologically)
    let longest = 0;
    let run = 0;
    const sorted = [...valid].sort((a: any, b: any) => a.log_date.localeCompare(b.log_date));
    for (let i = 0; i < sorted.length; i++) {
      if (i === 0) { run = 1; }
      else {
        const prev = sorted[i - 1].log_date;
        const curr = sorted[i].log_date;
        const prevDate = new Date(prev + 'T00:00:00');
        const currDate = new Date(curr + 'T00:00:00');
        const diffDays = Math.round((currDate.getTime() - prevDate.getTime()) / 86400000);
        if (diffDays === 1) { run++; } else { run = 1; }
      }
      longest = Math.max(longest, run);
    }
    if (sorted.length === 1) longest = 1;

    const total = valid.length;
    const rate = total > 0 ? Math.round((curfewOk / total) * 100) : 0;
    return { current, longest, total, curfewRate: rate };
  } catch (e) { console.error('getStreak failed', e); return { current: 0, longest: 0, total: 0, curfewRate: 0 }; }
}

export async function getSetting(key: string): Promise<string | null> {
  try {
    const database = await getDatabase();
    const [r] = await database.executeSql(`SELECT value FROM user_settings WHERE key=?`, [key]);
    return r.rows.length > 0 ? r.rows.item(0).value : null;
  } catch (e) { return null; }
}

export async function setSetting(key: string, value: string): Promise<boolean> {
  try {
    const database = await getDatabase();
    await database.executeSql(`INSERT OR REPLACE INTO user_settings (key, value) VALUES (?,?)`, [key, value]);
    return true;
  } catch (e) { return false; }
}
