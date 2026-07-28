import React, { useState, useCallback } from 'react';
import { View, ScrollView } from 'react-native';
import { T } from '../theme/T';
import { useTheme } from '../theme/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemedStyles } from '../theme/useThemedStyles';
import { useFocusEffect } from '@react-navigation/native';
import { getStreak, getRecentLogs, getTodayLog, getSetting } from '../data/database';

export default function ReportScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const s = useThemedStyles((t) => ({
    container: { flex: 1, paddingTop: insets.top, backgroundColor: t.theme.colors.background },
    scroll: { padding: 20, paddingBottom: 80 },
    header: { alignItems: 'center', paddingVertical: 12 },
    headerTitle: { fontSize: 22, fontWeight: '700', color: t.theme.colors.text, marginTop: 4 },
    statRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: t.theme.colors.surfaceBorder },
    statLabel: { fontSize: 13, color: t.theme.colors.textSecondary },
    statValue: { fontSize: 13, fontWeight: '600', color: t.theme.colors.text },
    sectionTitle: { fontSize: 11, color: t.theme.colors.textSecondary, fontWeight: '600', marginTop: 16, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.8 },
    weekRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
    weekItem: { flex: 1, alignItems: 'center', padding: 10, borderRadius: 10, backgroundColor: t.theme.colors.surface, borderWidth: 1, borderColor: t.theme.colors.surfaceBorder },
    weekDay: { fontSize: 10, color: t.theme.colors.textSecondary, marginBottom: 4 },
    weekDot: { width: 6, height: 6, borderRadius: 3, marginBottom: 2 },
    weekLabel: { fontSize: 8, color: t.theme.colors.textSecondary },
    advice: { borderRadius: 10, padding: 12, marginVertical: 12, backgroundColor: t.theme.colors.primary + '12', borderWidth: 1, borderColor: t.theme.colors.primary + '20' },
    adviceText: { fontSize: 12, lineHeight: 18, color: t.theme.colors.text },
    highlight: { color: t.theme.colors.primary, fontWeight: '600' },
  }));

  const [todayLog, setTodayLog] = useState<any>(null);
  const [streak, setStreak] = useState({ current: 0, longest: 0, total: 0, curfewRate: 0 });
  const [recentLogs, setRecentLogs] = useState<any[]>([]);
  const [targetBed, setTargetBed] = useState('23:00');

  const loadData = useCallback(async () => {
    const today = new Date().toISOString().slice(0, 10);
    const [log, st, recent, tb] = await Promise.all([
      getTodayLog(today), getStreak(), getRecentLogs(14), getSetting('target_bedtime'),
    ]);
    setTodayLog(log); setStreak(st); setRecentLogs(recent);
    if (tb) setTargetBed(tb);
  }, []);

  useFocusEffect(loadData);

  const weekDays: { day: string; status: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const ds = d.toISOString().slice(0, 10);
    const log = recentLogs.find((l: any) => l.log_date === ds);
    const dayNames = ['日', '一', '二', '三', '四', '五', '六'];
    weekDays.push({
      day: dayNames[d.getDay()],
      status: log ? (log.bedtime && log.waketime ? 2 : 1) : 0,
    });
  }

  // Generate AI-style advice based on real data
  const getAdvice = () => {
    const lines: string[] = [];
    if (todayLog?.bedtime) {
      const [h, m] = todayLog.bedtime.split(':').map(Number);
      const [th, tm] = targetBed.split(':').map(Number);
      const actualMin = h * 60 + m;
      const targetMin = th * 60 + tm;
      if (actualMin - targetMin > 60) {
        lines.push(`比目标晚睡了${Math.round((actualMin - targetMin) / 60)}小时，今晚试试提前30分钟放下手机`);
      } else if (actualMin - targetMin > 30) {
        lines.push('比目标晚了一点。今晚可以试试睡前1小时不刷短视频');
      } else {
        lines.push('按时睡觉很棒！继续保持这个节奏');
      }
    } else {
      lines.push('昨晚还没有打卡记录，记得睡前点击「准备睡觉」');
    }
    if (streak.curfewRate < 80 && streak.total > 3) {
      lines.push('宵禁达标率偏低，打卡后尽量不要再碰手机');
    }
    if (streak.current >= 3) {
      lines.push(`已连续${streak.current}天打卡，坚持下去！`);
    }
    return lines;
  };


  // Calculate health score based on sleep quality vs targets
  const healthScore = (() => {
    if (!todayLog?.bedtime || !todayLog?.waketime) return 0;
    const [bh, bm] = todayLog.bedtime.split(':').map(Number);
    const [wh, wm] = todayLog.waketime.split(':').map(Number);
    const [tbh, tbm] = tb.split(':').map(Number);
    const actualBed = bh * 60 + bm;
    const actualWake = wh * 60 + wm;
    const targetBed = tbh * 60 + tbm;
    // Bedtime: within 1h of target = 40pts, 2h = 20pts
    const bedDiff = Math.abs(actualBed - targetBed);
    let bedScore = bedDiff <= 60 ? 40 : bedDiff <= 120 ? 20 : 0;
    // Sleep duration: 7-9h = 40pts, 5-7h = 30pts, <5h = 10pts
    let dur = actualWake - actualBed;
    if (dur < 0) dur += 24 * 60;
    let durScore = dur >= 420 ? 40 : dur >= 300 ? 30 : dur >= 180 ? 20 : 10;
    // Curfew: no phone = 20pts
    let curfewScore = todayLog?.phone_curfew_kept ? 20 : 0;
    return bedScore + durScore + curfewScore;
  })();

  const advice = getAdvice();

  return (
    <View style={s.container}>
      <ScrollView contentContainerStyle={s.scroll}>
        <View style={s.header}>
          <T style={{ fontSize: 36 }}>☀️</T>
          <T style={s.headerTitle}>晨间报告</T>
        </View>

        <View style={s.statRow}>
          <T style={s.statLabel}>🌙 昨晚就寝</T>
          <T style={s.statValue}>{todayLog?.bedtime || '--'}</T>
        </View>
        <View style={s.statRow}>
          <T style={s.statLabel}>☀️ 今早起</T>
          <T style={s.statValue}>{todayLog?.waketime || '--'}</T>
        </View>
        <View style={s.statRow}>
          <T style={s.statLabel}>💚 健康生活</T>
          <T style={[s.statValue, { color: healthScore >= 80 ? theme.colors.success : healthScore >= 60 ? theme.colors.warning : theme.colors.error }]}>
            {healthScore}分 · {healthScore >= 100 ? '健康' : healthScore >= 80 ? '亚健康' : healthScore >= 60 ? '不健康' : '不要命啦！'}
          </T>
        </View>

        {todayLog?.note && (
          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.warning + '10', borderWidth: 1, borderColor: theme.colors.warning + '15', borderRadius: 8, padding: 8, gap: 6, marginVertical: 8 }}>
            <T style={{ fontSize: 12 }}>📝</T>
            <T style={{ fontSize: 11, color: theme.colors.warning, flex: 1 }}>{todayLog.note}</T>
          </View>
        )}

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

        <T style={s.sectionTitle}>🏆 统计</T>
        <View style={s.statRow}><T style={s.statLabel}>🔥 连续天数</T><T style={s.statValue}>{streak.current}</T></View>
        <View style={s.statRow}><T style={s.statLabel}>📈 最长连续</T><T style={s.statValue}>{streak.longest}</T></View>
        <View style={s.statRow}><T style={s.statLabel}>📊 宵禁达标率</T><T style={s.statValue}>{streak.curfewRate}%</T></View>
        <View style={s.statRow}><T style={s.statLabel}>📋 总记录天数</T><T style={s.statValue}>{streak.total}</T></View>

        <View style={s.advice}>
          {advice.map((line, i) => (
            <T key={i} style={s.adviceText}>💡 {line}</T>
          ))}
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.surfaceBorder, borderRadius: 10, padding: 12, gap: 8, marginTop: 16 }}>
          <T style={{ fontSize: 7, color: theme.colors.textSecondary }}>广告</T>
          <T style={{ fontSize: 14 }}>🎬</T>
          <T style={{ flex: 1, fontSize: 11, color: theme.colors.textSecondary }}>夜间助眠音乐·免费试听</T>
          <T style={{ fontSize: 10, color: theme.colors.primary, fontWeight: '600' }}>播放</T>
        </View>
      </ScrollView>
    </View>
  );
}
