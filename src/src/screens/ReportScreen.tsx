import React, { useState, useCallback } from 'react';
import { View, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { T } from '../theme/T';
import { useTheme } from '../theme/ThemeContext';
import { useI18n } from '../i18n/I18nContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemedStyles } from '../theme/useThemedStyles';
import { useFocusEffect } from '@react-navigation/native';
import { getStreak, getRecentLogs, getTodayLog, getSetting } from '../data/database';

export default function ReportScreen() {
  const { theme } = useTheme();
  const { t } = useI18n();
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
  const [showScoreDetail, setShowScoreDetail] = useState(false);
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
        lines.push(t('report.advice.late1'));
      } else if (actualMin - targetMin > 30) {
        lines.push(t('report.advice.late2'));
      } else {
        lines.push(t('report.advice.ok'));
      }
    } else {
      lines.push(t('report.advice.nolog'));
    }
    if (streak.curfewRate < 80 && streak.total > 3) {
      lines.push(t('report.advice.low'));
    }
    if (streak.current >= 3) {
      lines.push(t('report.advice.streak').replace('{}', String(streak.current)));
    }
    return lines;
  };


  // Calculate health score based on sleep quality vs targets
  const healthScore = (() => {
    if (!todayLog?.bedtime || !todayLog?.waketime) return 0;
    const [bh, bm] = todayLog.bedtime.split(':').map(Number);
    const [wh, wm] = todayLog.waketime.split(':').map(Number);
    const [tbh, tbm] = targetBed.split(':').map(Number);
    const actualBed = bh * 60 + bm;
    const actualWake = wh * 60 + wm;
    const targetBedMin = tbh * 60 + tbm;
    // Bedtime: within 1h of target = 40pts, 2h = 20pts
    const bedDiff = Math.abs(actualBed - targetBedMin);
    let bedScore = bedDiff <= 60 ? 40 : bedDiff <= 120 ? 20 : 0;
    // Sleep duration: 7-9h = 40pts, 5-7h = 30pts, <5h = 10pts
    let dur = actualWake - actualBed;
    if (dur < 0) dur += 24 * 60;
    let durScore = dur >= 420 ? 40 : dur >= 300 ? 30 : dur >= 180 ? 20 : 10;
    // Curfew: no phone = 20pts
    let curfewScore = todayLog?.phone_curfew_kept ? 20 : 0;
    return bedScore + durScore + curfewScore;
  })();


  // Score breakdown for detail modal
  const scoreDetail = (() => {
    if (!todayLog?.bedtime || !todayLog?.waketime) return null;
    const [bh, bm] = todayLog.bedtime.split(':').map(Number);
    const [wh, wm] = todayLog.waketime.split(':').map(Number);
    const [tbh, tbm] = targetBed.split(':').map(Number);
    const actualBed = bh * 60 + bm;
    const targetBedMin = tbh * 60 + tbm;
    const bedDiff = Math.abs(actualBed - targetBedMin);
    const bedScore = bedDiff <= 60 ? 40 : bedDiff <= 120 ? 20 : 0;
    let dur = (wh * 60 + wm) - (bh * 60 + bm);
    if (dur < 0) dur += 24 * 60;
    const durScore = dur >= 420 ? 40 : dur >= 300 ? 30 : dur >= 180 ? 20 : 10;
    const curfewScore = todayLog?.phone_curfew_kept ? 20 : 0;
    return {
      bed: { score: bedScore, max: 40, label: t('health.bed.label'), detail: '目标 ' + targetBed + ' +/-1h=' + bedScore + '/' + '40' },
      dur: { score: durScore, max: 40, label: t('health.dur.label'), detail: Math.floor(dur/60) + 'h' + (dur%60) + 'm' },
      curfew: { score: curfewScore, max: 20, label: t('health.curfew.label'), detail: curfewScore > 0 ? '+20' : '+0' },
    };
  })();

  const advice = getAdvice();

  return (
    <View style={s.container}>
      <ScrollView contentContainerStyle={s.scroll}>
        <View style={s.header}>
          <T style={{ fontSize: 36 }}>☀️</T>
          <T style={s.headerTitle}>{t('report.title')}</T>
        </View>

        <View style={s.statRow}>
          <T style={s.statLabel}>{t('report.bedtime')}</T>
          <T style={s.statValue}>{todayLog?.bedtime || '--'}</T>
        </View>
        <View style={s.statRow}>
          <T style={s.statLabel}>{t('report.wakeup')}</T>
          <T style={s.statValue}>{todayLog?.waketime || '--'}</T>
        </View>
        <TouchableOpacity onPress={() => setShowScoreDetail(true)} style={s.statRow}>
          <T style={s.statLabel}>💚 {t('report.health')}</T>
          <T style={[s.statValue, { color: healthScore >= 80 ? theme.colors.success : healthScore >= 60 ? theme.colors.warning : theme.colors.error }]}>
            {healthScore}分 · {healthScore >= 100 ? t('health.great') : healthScore >= 80 ? t('health.ok') : healthScore >= 60 ? t('health.bad') : t('health.dead')} ›
          </T>
        </TouchableOpacity>

        {todayLog?.note && (
          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.warning + '10', borderWidth: 1, borderColor: theme.colors.warning + '15', borderRadius: 8, padding: 8, gap: 6, marginVertical: 8 }}>
            <T style={{ fontSize: 12 }}>📝</T>
            <T style={{ fontSize: 11, color: theme.colors.warning, flex: 1 }}>{todayLog.note}</T>
          </View>
        )}

        <T style={s.sectionTitle}>{t('report.week')}</T>
        <View style={s.weekRow}>
          {weekDays.map((w, i) => (
            <View key={i} style={s.weekItem}>
              <T style={s.weekDay}>{w.day}</T>
              <View style={[s.weekDot, { backgroundColor: ['#4a4a5a', theme.colors.warning, theme.colors.success][w.status] }]} />
              <T style={{ fontSize: 14 }}>{['○', '🌙', '✅'][w.status]}</T>
            </View>
          ))}
        </View>

        <T style={s.sectionTitle}>{t('report.stats')}</T>
        <View style={s.statRow}><T style={s.statLabel}>{t('report.streak')}</T><T style={s.statValue}>{streak.current}</T></View>
        <View style={s.statRow}><T style={s.statLabel}>{t('report.longest')}</T><T style={s.statValue}>{streak.longest}</T></View>
        <View style={s.statRow}><T style={s.statLabel}>{t('report.rate')}</T><T style={s.statValue}>{streak.curfewRate}%</T></View>
        <View style={s.statRow}><T style={s.statLabel}>{t('report.total')}</T><T style={s.statValue}>{streak.total}</T></View>

        <View style={s.advice}>
          {advice.map((line, i) => (
            <T key={i} style={s.adviceText}>💡 {line}</T>
          ))}
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.surfaceBorder, borderRadius: 10, padding: 12, gap: 8, marginTop: 16 }}>
          <T style={{ fontSize: 7, color: theme.colors.textSecondary }}>{t('ad.label')}</T>
          <T style={{ fontSize: 14 }}>🎬</T>
          <T style={{ flex: 1, fontSize: 11, color: theme.colors.textSecondary }}>🛏️ Sleep Music</T>
          <T style={{ fontSize: 10, color: theme.colors.primary, fontWeight: '600' }}>▶</T>
        </View>
      </ScrollView>

      {/* Health Score Detail Modal */}
      <Modal visible={showScoreDetail} transparent animationType="fade" onRequestClose={() => setShowScoreDetail(false)}>
        <View style={{ flex: 1, backgroundColor: '#0a0a12', justifyContent: 'center', padding: 20 }}>
          <View style={{ backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.surfaceBorder, borderRadius: 20, padding: 24 }}>
            <T style={{ fontSize: 18, fontWeight: '700', color: theme.colors.text, textAlign: 'center', marginBottom: 4 }}>{t('health.title')}</T>
            <T style={{ fontSize: 12, color: theme.colors.textSecondary, textAlign: 'center', marginBottom: 16 }}>{t('health.max')}</T>
            {scoreDetail && (
              <View style={{ gap: 12 }}>
                {[scoreDetail.bed, scoreDetail.dur, scoreDetail.curfew].map((item, i) => (
                  <View key={i} style={{ backgroundColor: theme.colors.background + '60', borderRadius: 10, padding: 12 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <T style={{ fontSize: 13, fontWeight: '500', color: theme.colors.text }}>{item.label}</T>
                      <T style={{ fontSize: 13, fontWeight: '700', color: item.score >= item.max * 0.7 ? theme.colors.success : item.score >= item.max * 0.4 ? theme.colors.warning : theme.colors.error }}>{item.score}/{item.max}</T>
                    </View>
                    <T style={{ fontSize: 11, color: theme.colors.textSecondary, marginTop: 4 }}>{item.detail}</T>
                    <View style={{ height: 4, backgroundColor: theme.colors.surface, borderRadius: 2, marginTop: 6 }}>
                      <View style={{ width: (item.score / item.max * 100) + '%', height: 4, backgroundColor: item.score >= item.max * 0.7 ? theme.colors.success : item.score >= item.max * 0.4 ? theme.colors.warning : theme.colors.error, borderRadius: 2 }} />
                    </View>
                  </View>
                ))}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 8, borderTopWidth: 1, borderTopColor: theme.colors.surfaceBorder }}>
                  <T style={{ fontSize: 15, fontWeight: '600', color: theme.colors.text }}>{t('health.total')}</T>
                  <T style={{ fontSize: 18, fontWeight: '700', color: theme.colors.primary }}>{healthScore}/100</T>
                </View>
              </View>
            )}
            <TouchableOpacity onPress={() => setShowScoreDetail(false)} style={{ padding: 12, alignItems: 'center', marginTop: 12 }}>
              <T style={{ fontSize: 14, color: theme.colors.primary, fontWeight: '600' }}>{t('health.close')}</T>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
