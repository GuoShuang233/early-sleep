import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView } from 'react-native'
import { T } from '../theme/T';
import { useTheme } from '../theme/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemedStyles } from '../theme/useThemedStyles';
import { getStreak, getRecentLogs, getTodayLog } from '../data/database';

export default function ReportScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const s = useThemedStyles((t) => ({
    container: { flex: 1, paddingTop: insets.top, backgroundColor: t.theme.colors.background },
    scroll: { padding: 20, paddingBottom: 80 },
    header: { alignItems: 'center', paddingVertical: 12 },
    headerIcon: { fontSize: 36 },
    headerTitle: { fontSize: 22, fontWeight: '700', color: t.theme.colors.text, marginTop: 4 },
    statRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: t.theme.colors.surfaceBorder },
    statLabel: { fontSize: 13, color: t.theme.colors.textSecondary },
    statValue: { fontSize: 13, fontWeight: '600', color: t.theme.colors.text },
    noteBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: t.theme.colors.warning + '10', borderWidth: 1, borderColor: t.theme.colors.warning + '15', borderRadius: 8, padding: 8, gap: 6, marginVertical: 8 },
    noteIcon: { fontSize: 12 },
    noteText: { fontSize: 11, color: t.theme.colors.warning, flex: 1 },
    sectionTitle: { fontSize: 11, color: t.theme.colors.textSecondary, fontWeight: '600', marginTop: 16, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.8 },
    appRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 5 },
    appName: { width: 50, fontSize: 11, color: t.theme.colors.textSecondary },
    appBarBg: { flex: 1, height: 14, backgroundColor: t.theme.colors.surface, borderRadius: 7, overflow: 'hidden' },
    appBarFill: { height: '100%', borderRadius: 7 },
    appTime: { width: 40, textAlign: 'right', fontSize: 11, color: t.theme.colors.text },
    advice: { borderRadius: 10, padding: 12, marginVertical: 12, backgroundColor: t.theme.colors.primary + '12', borderWidth: 1, borderColor: t.theme.colors.primary + '20' },
    adviceText: { fontSize: 12, lineHeight: 18, color: t.theme.colors.text },
    weekRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
    weekItem: { flex: 1, alignItems: 'center', padding: 10, borderRadius: 10, backgroundColor: t.theme.colors.surface, borderWidth: 1, borderColor: t.theme.colors.surfaceBorder },
    weekDay: { fontSize: 10, color: t.theme.colors.textSecondary, marginBottom: 4 },
    weekDot: { width: 6, height: 6, borderRadius: 3, marginBottom: 2 },
    weekLabel: { fontSize: 8, color: t.theme.colors.textSecondary },
    ad: { flexDirection: 'row', alignItems: 'center', backgroundColor: t.theme.colors.surface, borderWidth: 1, borderColor: t.theme.colors.surfaceBorder, borderRadius: 10, padding: 12, gap: 8, marginTop: 16 },
    adBadge: { fontSize: 7, color: t.theme.colors.textSecondary }, adText: { flex: 1, fontSize: 11, color: t.theme.colors.textSecondary },
    adCta: { fontSize: 10, color: t.theme.colors.primary, fontWeight: '600' },
  }));

  const [todayLog, setTodayLog] = useState<any>(null);
  const [streak, setStreak] = useState({ current: 0, longest: 0, total: 0, curfewRate: 0 });
  const [recentLogs, setRecentLogs] = useState<any[]>([]);

  const loadData = useCallback(async () => {
    const today = new Date().toISOString().slice(0, 10);
    const [log, st, recent] = await Promise.all([getTodayLog(today), getStreak(), getRecentLogs(14)]);
    setTodayLog(log); setStreak(st); setRecentLogs(recent);
  }, []);
  useEffect(() => { loadData(); }, [loadData]);

  const stats = [
    { icon: '🌙', label: '就寝', value: todayLog?.bedtime || '--' },
    { icon: '☀️', label: '起床', value: todayLog?.waketime || '--' },
    { icon: '📵', label: '宵禁', value: todayLog?.phone_curfew_kept ? '✅ 达标' : '--' },
  ];

  // Week mini calendar
  const weekDays: { day: string; status: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const ds = d.toISOString().slice(0, 10);
    const log = recentLogs.find((l: any) => l.log_date === ds);
    const dayNames = ['日', '一', '二', '三', '四', '五', '六'];
    weekDays.push({
      day: dayNames[d.getDay()],
      status: log ? (log.phone_curfew_kept ? 2 : 1) : 0,
    });
  }

  return (
    <View style={s.container}>
      <ScrollView contentContainerStyle={s.scroll}>
        <View style={s.header}>
          <T style={s.headerIcon}>☀️</T>
          <T style={s.headerTitle}>早上好</T>
        </View>

        {stats.map((st, i) => (
          <View key={i} style={s.statRow}>
            <T style={s.statLabel}>{st.icon} {st.label}</T>
            <T style={s.statValue}>{st.value}</T>
          </View>
        ))}

        {todayLog?.note && (
          <View style={s.noteBox}>
            <T style={s.noteIcon}>📝</T>
            <T style={s.noteText}>{todayLog.note}</T>
          </View>
        )}

        {/* Week Calendar */}
        <T style={s.sectionTitle}>📅 本周</T>
        <View style={s.weekRow}>
          {weekDays.map((w, i) => (
            <View key={i} style={s.weekItem}>
              <T style={s.weekDay}>{w.day}</T>
              <View style={[s.weekDot, { backgroundColor: ['#4a4a5a', theme.colors.warning, theme.colors.success][w.status] }]} />
              <T style={s.weekLabel}>{['--', '晚睡', '达标'][w.status]}</T>
            </View>
          ))}
        </View>

        {/* Streak */}
        <T style={s.sectionTitle}>🏆 统计</T>
        <View style={s.statRow}><T style={s.statLabel}>🔥 连续天数</T><T style={s.statValue}>{streak.current}</T></View>
        <View style={s.statRow}><T style={s.statLabel}>📈 最长连续</T><T style={s.statValue}>{streak.longest}</T></View>
        <View style={s.statRow}><T style={s.statLabel}>📊 宵禁达标率</T><T style={s.statValue}>{streak.curfewRate}%</T></View>
        <View style={s.statRow}><T style={s.statLabel}>📋 总记录天数</T><T style={s.statValue}>{streak.total}</T></View>

        {/* Advice */}
        <View style={s.advice}>
          <T style={s.adviceText}>💡 打卡后又刷了半小时。今晚试试打卡后直接放客厅充电？</T>
        </View>

        <View style={s.ad}>
          <T style={s.adBadge}>广告</T>
          <T style={{ fontSize: 14 }}>🎬</T>
          <T style={s.adText}>夜间助眠音乐·免费试听</T>
          <T style={s.adCta}>播放</T>
        </View>
      </ScrollView>
    </View>
  );
}
