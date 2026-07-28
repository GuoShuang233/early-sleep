import { NativeModules, Platform } from 'react-native';

// Health Connect sleep data reader
// Uses react-native-health-connect to read sleep sessions

let HealthConnect: any = null;
try {
  HealthConnect = require('react-native-health-connect').default;
} catch {}

export interface SleepSession {
  startTime: string;
  endTime: string;
  duration: string;
}

export async function getSleepSessions(): Promise<SleepSession[]> {
  if (!HealthConnect) return [];
  try {
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const result = await HealthConnect.readRecords('SleepSession', {
      timeRangeFilter: {
        operator: 'between',
        startTime: yesterday.toISOString(),
        endTime: now.toISOString(),
      },
    });
    return (result.records || []).map((r: any) => ({
      startTime: r.startTime,
      endTime: r.endTime,
      duration: formatDuration(new Date(r.endTime).getTime() - new Date(r.startTime).getTime()),
    }));
  } catch (e) {
    console.error('getSleepSessions failed', e);
    return [];
  }
}

export async function hasHealthPermission(): Promise<boolean> {
  if (!HealthConnect) return false;
  try {
    const granted = await HealthConnect.getGrantedPermissions();
    return granted?.some((p: any) => p.permissionType === 'SleepSession' && p.accessType === 'read') || false;
  } catch {
    return false;
  }
}

function formatDuration(ms: number): string {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  return h > 0 ? h + 'h' + m + 'm' : m + 'm';
}
