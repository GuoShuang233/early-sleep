import { NativeModules } from 'react-native';

const { UsageStatsModule } = NativeModules;

export interface AppUsageItem {
  packageName: string;
  appName: string;
  usageMs: number;
}

export interface SleepUsageResult {
  usedPhone: boolean;
  totalUsageMs: number;
  totalUsage: string;
  apps: AppUsageItem[];
}

export async function hasUsagePermission(): Promise<boolean> {
  try {
    return await UsageStatsModule.hasPermission();
  } catch {
    return false;
  }
}

export async function openUsageSettings(): Promise<boolean> {
  try {
    return await UsageStatsModule.openPermissionSettings();
  } catch {
    return false;
  }
}

export async function getPhoneUsageDuringSleep(
  sleepTimeMs: number,
  wakeTimeMs: number
): Promise<SleepUsageResult | null> {
  try {
    return await UsageStatsModule.getPhoneUsageDuringSleep(sleepTimeMs, wakeTimeMs);
  } catch (e) {
    console.error('getPhoneUsageDuringSleep failed', e);
    return null;
  }
}

export async function getAppUsageInRange(
  startMs: number,
  endMs: number
): Promise<AppUsageItem[]> {
  try {
    const result = await UsageStatsModule.getAppUsageInRange(startMs, endMs);
    return result || [];
  } catch {
    return [];
  }
}
