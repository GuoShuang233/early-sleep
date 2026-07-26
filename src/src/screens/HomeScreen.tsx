import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Modal } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemedStyles } from '../theme/useThemedStyles';
import { getTodayLog, logBedtime, logWaketime, getStreak, getRecentLogs } from '../data/database';

export default function HomeScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const s = useThemedStyles((t) => {
    const c = t.theme.colors;
    return {
      container: { flex: 1, paddingTop: insets.top, backgroundColor: c.background },
      scroll: { padding: 20, paddingBottom: 80 },
      greeting: { fontSize: 24, fontWeight: '600', color: c.text, letterSpacing: -0.3 },
      targetText: { fontSize: 13, color: c.textSecondary, marginTop: 2, marginBottom: 14 },
      streakRow: { flexDirection: 'row', gap: 6, marginBottom: 14 },
      streakItem: { flex: 1, backgroundColor: c.surface, borderWidth: 1, borderColor: c.surfaceBorder, borderRadius: 12, padding: 12, alignItems: 'center' },
      streakNum: { fontSize: 22, fontWeight: '700' },
      streakLabel: { fontSize: 10, color: c.textSecondary, marginTop: 3, textTransform: 'uppercase', letterSpacing: 0.5 },
      btnSleep: { backgroundColor: c.primary, padding: 16, alignItems: 'center', borderRadius: 14, shadowColor: c.primary, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.25, shadowRadius: 32, elevation: 8 },
      btnSleepText: { color: '#fff', fontSize: 17, fontWeight: '600' },
      btnSleepSub: { color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 2 },
      btnWake: { backgroundColor: c.surface, borderWidth: 1, borderColor: c.surfaceBorder, borderRadius: 14, padding: 14, alignItems: 'center', marginTop: 8, marginBottom: 16 },
      btnWakeText: { color: c.text, fontSize: 16, fontWeight: '500' },
      completedCard: { backgroundColor: c.success + '14', borderWidth: 1, borderColor: c.success + '25', borderRadius: 14, padding: 16, alignItems: 'center', marginBottom: 16 },
      completedText: { color: c.success, fontSize: 16, fontWeight: '600' },
      completedSub: { color: c.textSecondary, fontSize: 12, marginTop: 4 },
      card: { backgroundColor: c.surface, borderWidth: 1, borderColor: c.surfaceBorder, borderRadius: 14, padding: 16, marginBottom: 14 },
      cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
      cardTitle: { fontSize: 12, color: c.textSecondary, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.8 },
      logEntry: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 6 },
      logDot: { width: 8, height: 8, borderRadius: 4 },
      logInfo: { flex: 1 },
      logLabel: { fontSize: 13, color: c.text, fontWeight: '500' },
      logTime: { fontSize: 11, color: c.textSecondary, marginTop: 1 },
      logCheck: { fontSize: 11, color: c.success },
      adBanner: { flexDirection: 'row', alignItems: 'center', backgroundColor: c.surface, borderWidth: 1, borderColor: c.surfaceBorder, borderRadius: 10, padding: 12, gap: 8, marginTop: 4 },
      adBadge: { fontSize: 8, color: c.textSecondary },
      adIcon: { fontSize: 14 }, adText: { flex: 1, fontSize: 11, color: c.textSecondary },
      adCta: { fontSize: 10, color: c.primary, fontWeight: '600' },
      modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', padding: 20 },
      modalContent: { backgroundColor: c.background, borderRadius: 20, padding: 28, borderWidth: 1, borderColor: c.surfaceBorder },
      modalTitle: { fontSize: 22, fontWeight: '700', textAlign: 'center', color: c.text, marginBottom: 8 },
      modalDesc: { fontSize: 14, color: c.textSecondary, textAlign: 'center', lineHeight: 20, marginBottom: 20 },
      noteInput: { backgroundColor: c.surface, borderWidth: 1, borderColor: c.surfaceBorder, borderRadius: 10, padding: 12, fontSize: 14, color: c.text, marginBottom: 16 },
      modalBtn: { backgroundColor: c.primary, borderRadius: 12, padding: 14, alignItems: 'center' },
      modalBtnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
      modalCancel: { padding: 12, alignItems: 'center', marginTop: 8 },
      modalCancelText: { color: c.textSecondary, fontSize: 14 },
    };
  });

  const [streak, setStreak] = useState({ current: 0, longest: 0, total: 0, curfewRate: 0 });
  const [todayLog, setTodayLog] = useState<any>(null);
  const [recentLogs, setRecentLogs] = useState<any[]>([]);
  const [showBedtimeModal, setShowBedtimeModal] = useState(false);
  const [note, setNote] = useState('');

  const loadData = useCallback(async () => {
    try {
      const today = new Date().toISOString().slice(0, 10);
      const [log, st, recent] = await Promise.all([getTodayLog(today), getStreak(), getRecentLogs(7)]);
      setTodayLog(log); setStreak(st); setRecentLogs(recent);
    } catch (e) { console.warn(e); }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const handleBedtime = async () => {
    const today = new Date().toISOString().slice(0, 10);
    const now = new Date().toTimeString().slice(0, 5);
    await logBedtime(today, now, true, note);
    setShowBedtimeModal(false); setNote('');
    loadData();
  };
  const handleWakeup = async () => {
    const today = new Date().toISOString().slice(0, 10);
    const now = new Date().toTimeString().slice(0, 5);
    await logWaketime(today, now);
    loadData();
  };

  return (
    <View style={s.container}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        <Text style={s.greeting}>🌙 晚上好</Text>
        <Text style={s.targetText}>目标 23:00</Text>
        <View style={s.streakRow}>
          <View style={s.streakItem}>
            <Text style={[s.streakNum, { color: theme.colors.primary }]}>{streak.current}</Text>
            <Text style={s.streakLabel}>连续</Text>
          </View>
          <View style={s.streakItem}>
            <Text style={[s.streakNum, { color: theme.colors.warning }]}>{streak.curfewRate}%</Text>
            <Text style={s.streakLabel}>宵禁率</Text>
          </View>
          <View style={s.streakItem}>
            <Text style={[s.streakNum, { color: theme.colors.success }]}>--</Text>
            <Text style={s.streakLabel}>睡眠</Text>
          </View>
        </View>

        {!todayLog?.bedtime && (
          <TouchableOpacity style={s.btnSleep} onPress={() => setShowBedtimeModal(true)} activeOpacity={0.8}>
            <Text style={s.btnSleepText}>🌙 准备睡觉</Text>
            <Text style={s.btnSleepSub}>放下手机</Text>
          </TouchableOpacity>
        )}
        {todayLog?.bedtime && !todayLog?.waketime && (
          <TouchableOpacity style={s.btnWake} onPress={handleWakeup} activeOpacity={0.8}>
            <Text style={s.btnWakeText}>☀️ 我起床了</Text>
          </TouchableOpacity>
        )}
        {todayLog?.bedtime && todayLog?.waketime && (
          <View style={s.completedCard}>
            <Text style={s.completedText}>✅ 今日打卡已完成</Text>
            <Text style={s.completedSub}>就寝 {todayLog.bedtime} · 起床 {todayLog.waketime}</Text>
          </View>
        )}

        {recentLogs.length > 0 && (
          <View style={s.card}>
            <View style={s.cardHeader}><Text style={s.cardTitle}>最近记录</Text></View>
            {recentLogs.map((log, i) => (
              <View key={i} style={s.logEntry}>
                <View style={[s.logDot, { backgroundColor: log.phone_curfew_kept ? theme.colors.success : theme.colors.warning }]} />
                <View style={s.logInfo}>
                  <Text style={s.logLabel}>{log.log_date}</Text>
                  <Text style={s.logTime}>{log.bedtime || '--'} → {log.waketime || '--'}{log.note ? ` · ${log.note}` : ''}</Text>
                </View>
                {log.phone_curfew_kept ? <Text style={s.logCheck}>✅</Text> : null}
              </View>
            ))}
          </View>
        )}

        <View style={s.adBanner}>
          <Text style={s.adBadge}>广告</Text>
          <Text style={s.adIcon}>🛏️</Text>
          <Text style={s.adText}>泰国乳胶枕·限时7折</Text>
          <Text style={s.adCta}>了解</Text>
        </View>
      </ScrollView>

      <Modal visible={showBedtimeModal} transparent animationType="fade">
        <View style={s.modalOverlay}>
          <View style={s.modalContent}>
            <Text style={s.modalTitle}>🌙 准备入睡</Text>
            <Text style={s.modalDesc}>手机将进入宵禁检测模式{'\n'}检测到使用会记录但不打扰你</Text>
            <TextInput style={s.noteInput} placeholder="备注（选填）加班、应酬..." placeholderTextColor={theme.colors.textSecondary} value={note} onChangeText={setNote} />
            <TouchableOpacity style={s.modalBtn} onPress={handleBedtime}><Text style={s.modalBtnText}>🌙 确认睡觉</Text></TouchableOpacity>
            <TouchableOpacity style={s.modalCancel} onPress={() => setShowBedtimeModal(false)}><Text style={s.modalCancelText}>取消</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
