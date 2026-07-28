package com.earlysleep;

import android.app.AppOpsManager;
import android.app.usage.UsageStats;
import android.app.usage.UsageStatsManager;
import android.content.Context;
import android.content.pm.PackageManager;
import android.provider.Settings;
import android.os.Build;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.TreeMap;

public class UsageStatsModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;

    UsageStatsModule(ReactApplicationContext context) {
        super(context);
        this.reactContext = context;
    }

    @NonNull
    @Override
    public String getName() {
        return "UsageStatsModule";
    }

    @ReactMethod
    public void hasPermission(Promise promise) {
        try {
            AppOpsManager appOps = (AppOpsManager) reactContext.getSystemService(Context.APP_OPS_SERVICE);
            int mode = appOps.checkOpNoThrow(
                AppOpsManager.OPSTR_GET_USAGE_STATS,
                android.os.Process.myUid(),
                reactContext.getPackageName()
            );
            promise.resolve(mode == AppOpsManager.MODE_ALLOWED);
        } catch (Exception e) {
            promise.resolve(false);
        }
    }

    @ReactMethod
    public void openPermissionSettings(Promise promise) {
        try {
            android.content.Intent intent = new android.content.Intent(Settings.ACTION_USAGE_ACCESS_SETTINGS);
            intent.addFlags(android.content.Intent.FLAG_ACTIVITY_NEW_TASK);
            reactContext.startActivity(intent);
            promise.resolve(true);
        } catch (Exception e) {
            promise.reject("ERROR", e.getMessage());
        }
    }

    @ReactMethod
    public void getAppUsageInRange(double startTimeMs, double endTimeMs, Promise promise) {
        try {
            UsageStatsManager usm = (UsageStatsManager) reactContext.getSystemService(Context.USAGE_STATS_SERVICE);
            List<UsageStats> stats = usm.queryUsageStats(
                UsageStatsManager.INTERVAL_DAILY,
                (long) startTimeMs,
                (long) endTimeMs
            );

            WritableArray result = Arguments.createArray();
            if (stats != null) {
                for (UsageStats s : stats) {
                    long timeInForeground = s.getTotalTimeInForeground();
                    if (timeInForeground > 0) {
                        WritableMap item = Arguments.createMap();
                        item.putString("packageName", s.getPackageName());
                        item.putDouble("timeInForeground", timeInForeground);
                        item.putDouble("lastTimeUsed", s.getLastTimeUsed());
                        result.pushMap(item);
                    }
                }
            }
            promise.resolve(result);
        } catch (Exception e) {
            promise.reject("ERROR", e.getMessage());
        }
    }

    @ReactMethod
    public void getPhoneUsageDuringSleep(double sleepTimeMs, double wakeTimeMs, Promise promise) {
        try {
            UsageStatsManager usm = (UsageStatsManager) reactContext.getSystemService(Context.USAGE_STATS_SERVICE);
            PackageManager pm = reactContext.getPackageManager();

            long sleep = (long) sleepTimeMs;
            long wake = (long) wakeTimeMs;

            List<UsageStats> stats = usm.queryUsageStats(
                UsageStatsManager.INTERVAL_DAILY,
                sleep,
                wake
            );

            boolean usedPhone = false;
            long totalUsage = 0;
            WritableArray apps = Arguments.createArray();

            if (stats != null) {
                for (UsageStats s : stats) {
                    long timeInFg = s.getTotalTimeInForeground();
                    if (timeInFg > 0 && s.getLastTimeUsed() >= sleep && s.getLastTimeUsed() <= wake) {
                        usedPhone = true;
                        totalUsage += timeInFg;
                        WritableMap item = Arguments.createMap();
                        item.putString("packageName", s.getPackageName());
                        try {
                            String appName = pm.getApplicationLabel(
                                pm.getApplicationInfo(s.getPackageName(), 0)
                            ).toString();
                            item.putString("appName", appName);
                        } catch (Exception e) {
                            item.putString("appName", s.getPackageName());
                        }
                        item.putDouble("usageMs", timeInFg);
                        apps.pushMap(item);
                    }
                }
            }

            WritableMap result = Arguments.createMap();
            result.putBoolean("usedPhone", usedPhone);
            result.putDouble("totalUsageMs", totalUsage);
            result.putString("totalUsage", formatDuration(totalUsage));
            result.putArray("apps", apps);
            promise.resolve(result);
        } catch (Exception e) {
            promise.reject("ERROR", e.getMessage());
        }
    }

    private String formatDuration(long ms) {
        long seconds = ms / 1000;
        long minutes = seconds / 60;
        long hours = minutes / 60;
        if (hours > 0) return hours + "h " + (minutes % 60) + "m";
        if (minutes > 0) return minutes + "m " + (seconds % 60) + "s";
        return seconds + "s";
    }
}
