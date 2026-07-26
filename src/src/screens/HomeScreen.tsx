import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Modal, Alert } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useI18n } from '../i18n/I18nContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemedStyles } from '../theme/useThemedStyles';
import { getTodayLog, logBedtime, logWaketime, getStreak, getRecentLogs, getSetting } from '../data/database';

function getBtnStyle(btn: any, colors: any) {
  const s = btn?.style || 'rounded';
  const base: any = {};
  if (s === 'pill') base.borderRadius = 24;
  else if (s === 'sharp') base.borderRadius = 0;
  else if (s === 'glow') { base.borderRadius = 14; base.shadowOpacity = 0.4; base.shadowRadius = 24; }
  else if (s === 'outline') { base.borderRadius = 14; base.borderWidth = 2; base.borderColor = colors.primary; base.backgroundColor = 'transparent'; }
  else if (s === '3d') { base.borderRadius = 14; base.borderBottomWidth = 4; base.borderBottomColor = colors.primary + '80'; }
  else if (['cat', 'bear', 'owl', 'star'].includes(s)) base.borderRadius = 18;
  else base.borderRadius = 14;
  return base;
}

export default function HomeScreen() {
  const { theme } = useTheme();
  const { t } = useI18n();
  const insets = useSafeAreaInsets();
  const s = useThemedStyles((tc) => ({
    container: { flex: 1, paddingTop: insets.top, backgroundColor: tc.theme.colors.background },
    scroll: { padding: 20, paddingBottom: 80 },
    greeting: { fontSize: 24, fontWeight: '600', color: tc.theme.colors.text, letterSpacing: -0.3 },
    targetText: { fontSize: 13, color: tc.theme.colors.textSecondary, marginTop: 2, marginBottom: 14 },
    streakRow: { flexDirection: 'row', gap: 6, marginBottom: 14 },
    streakItem: { flex: 1, backgroundColor: tc.theme.colors.surface, borderWidth: 1, borderColor: tc.theme.colors.surfaceBorder, borderRadius: 12, padding: 12, alignItems: 'center' },
    streakNum: { fontSize: 22, fontWeight: '700' },
    streakLabel: { fontSize: 10, color: tc.theme.colors.textSecondary, marginTop: 3, textTransform: 'uppercase', letterSpacing: 0.5 },
    btnSleep: { backgroundColor: tc.theme.colors.primary, padding: 16, alignItems: 'center', shadowColor: tc.theme.colors.primary, shadowOffset: { width: 0, height: 8 }, elevation: 8 },
    btnSleepText: { color: '#fff', fontSize: 17, fontWeight: '600' },
    btnSleepSub: { color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 2 },
    btnWake: { backgroundColor: tc.theme.colors.surface, borderWidth: 1, borderColor: tc.theme.colors.surfaceBorder, padding: 14, alignItems: 'center', marginTop: 8, marginBottom: 16 },
    btnWakeText: { color: tc.theme.colors.text, fontSize: 16, fontWeight: '500' },
    completedCard: { backgroundColor: tc.theme.colors.success + '14', borderWidth: 1, borderColor: tc.theme.colors.success + '25', borderRadius: 14, padding: 16, alignItems: 'center', marginBottom: 16 },
    completedText: { color: tc.theme.colors.success, fontSize: 16, fontWeight: '600' },
    completedSub: { color: tc.theme.colors.textSecondary, fontSize: 12, marginTop: 4 },
    card: { backgroundColor: tc.theme.colors.surface, borderWidth: 1, borderColor: tc.theme.colors.surfaceBorder, borderRadius: 14, padding: 16, marginBottom: 14 },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
    cardTitle: { fontSize: 12, color: tc.theme.colors.textSecondary, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.8 },
    logEntry: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 6 },
    logDot: { width: 8, height: 8, borderRadius: 4 },
    logInfo: { flex: 1 },
    logLabel: { fontSize: 13, color: tc.theme.colors.text, fontWeight: '500' },
    logTime: { fontSize: 11, color: tc.theme.colors.textSecondary, marginTop: 1 },
    logCheck: { fontSize: 11, color: tc.theme.colors.success },
    adBanner: { flexDirection: 'row', alignItems: 'center', backgroundColor: tc.theme.colors.surface, borderWidth: 1, borderColor: tc.theme.colors.surfaceBorder, borderRadius: 10, padding: 12, gap: 8, marginTop: 4 },
    adBadge: { fontSize: 8, color: tc.theme.colors.textSecondary }, adText: { flex: 1, fontSize: 11, color: tc.theme.colors.textSecondary },
    adCta: { fontSize: 10, color: tc.theme.colors.primary, fontWeight: '600' },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', padding: 20 },
    modalContent: { backgroundColor: tc.theme.colors.background, borderRadius: 20, padding: 28, borderWidth: 1, borderColor: tc.theme.colors.surfaceBorder },
    modalTitle: { fontSize: 22, fontWeight: '700', textAlign: 'center', color: tc.theme.colors.text, marginBottom: 8 },
    modalDesc: { fontSize: 14, color: tc.theme.colors.textSecondary, textAlign: 'center', lineHeight: 20, marginBottom: 20 },
    noteInput: { backgroundColor: tc.theme.colors.surface, borderWidth: 1, borderColor: tc.theme.colors.surfaceBorder, borderRadius: 10, padding: 12, fontSize: 14, color: tc.theme.colors.text, marginBottom: 16 },
    modalBtn: { backgroundColor: tc.theme.colors.primary, borderRadius: 12, padding: 14, alignItems: 'center' },
    modalBtnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
    modalCancel: { padding: 12, alignItems: 'center', marginTop: 8 },
    modalCancelText: { color: tc.theme.colors.textSecondary, fontSize: 14 },
  }));

  const [streak, setStreak] = useState({ current: 0, longest: 0, total: 0, curfewRate: 0 });
  const [todayLog, setTodayLog] = useState<any>(null);
  const [recentLogs, setRecentLogs] = useState<any[]>([]);
  const [targetBedtime, setTargetBedtime] = useState('23:00');
  const [showBedtimeModal, setShowBedtimeModal] = useState(false);
  const [note, setNote] = useState('');

  const loadData = useCallback(async () => {
    try {
      const today = new Date().toISOString().slice(0, 10);
      const [log, st, recent, target] = await Promise.all([
        getTodayLog(today), getStreak(), getRecentLogs(7),
        getSetting('target_bedtime'),
      ]);
      setTodayLog(log); setStreak(st); setRecentLogs(recent);
      if (target) setTargetBedtime(target);
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

  const btnStyle = getBtnStyle(theme.button, theme.colors);

  return (
    <View style={s.container}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        <Text style={[s.greeting, theme.font && { fontFamily: theme.font }]}>{t('home.greeting.night')}</Text>
        <Text style={s.targetText}>{t('home.target')} {targetBedtime}</Text>
        <View style={s.streakRow}>
          <View style={s.streakItem}><Text style={[s.streakNum, { color: theme.colors.primary }]}>{streak.current}</Text><Text style={s.streakLabel}>{t('home.streak')}</Text></View>
          <View style={s.streakItem}><Text style={[s.streakNum, { color: theme.colors.warning }]}>{streak.curfewRate}%</Text><Text style={s.streakLabel}>{t('home.curfew.rate')}</Text></View>
          <View style={s.streakItem}><Text style={[s.streakNum, { color: theme.colors.success }]}>--</Text><Text style={s.streakLabel}>{t('home.sleep')}</Text></View>
        </View>

        {!todayLog?.bedtime && (
          <TouchableOpacity style={[s.btnSleep, btnStyle]} onPress={() => setShowBedtimeModal(true)} activeOpacity={0.8}>
            <Text style={s.btnSleepText}>{t('home.bedtime')}</Text>
            <Text style={s.btnSleepSub}>{t('home.bedtime.sub')}</Text>
          </TouchableOpacity>
        )}
        {todayLog?.bedtime && !todayLog?.waketime && (
          <TouchableOpacity style={[s.btnWake, btnStyle]} onPress={handleWakeup} activeOpacity={0.8}>
            <Text style={s.btnWakeText}>{t('home.wakeup')}</Text>
          </TouchableOpacity>
        )}
        {todayLog?.bedtime && todayLog?.waketime && (
          <View style={s.completedCard}>
            <Text style={s.completedText}>{t('home.completed')}</Text>
            <Text style={s.completedSub}>{t('report.bedtime')} {todayLog.bedtime} · {t('report.wakeup')} {todayLog.waketime}</Text>
          </View>
        )}

        {recentLogs.length > 0 && (
          <View style={s.card}>
            <View style={s.cardHeader}><Text style={s.cardTitle}>{t('home.recent')}</Text></View>
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
          <Text style={{ fontSize: 14 }}>🛏️</Text>
          <Text style={s.adText}>{t('calendar.ad')}</Text>
          <Text style={s.adCta}>{t('home.detail')}</Text>
        </View>
      </ScrollView>

      <Modal visible={showBedtimeModal} transparent animationType="fade">
        <View style={s.modalOverlay}>
          <View style={s.modalContent}>
            <Text style={s.modalTitle}>{t('home.bedtime')}</Text>
            <Text style={s.modalDesc}>{t('home.modal.desc')}</Text>
            <TextInput style={s.noteInput} placeholder={t('home.note.placeholder')} placeholderTextColor={theme.colors.textSecondary} value={note} onChangeText={setNote} />
            <TouchableOpacity style={s.modalBtn} onPress={handleBedtime}><Text style={s.modalBtnText}>{t('home.confirm.bedtime')}</Text></TouchableOpacity>
            <TouchableOpacity style={s.modalCancel} onPress={() => setShowBedtimeModal(false)}><Text style={s.modalCancelText}>{t('home.cancel')}</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
