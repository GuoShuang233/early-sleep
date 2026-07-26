import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Modal, ImageBackground } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useI18n } from '../i18n/I18nContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemedStyles } from '../theme/useThemedStyles';
import { resolveFont } from '../theme/fonts';
import { getTodayLog, logBedtime, logWaketime, getStreak, getRecentLogs, getSetting } from '../data/database';

function btnRadius(style: string) {
  if (style === 'pill') return 24;
  if (style === 'sharp') return 0;
  if (['cat','bear','owl','star'].includes(style)) return 18;
  return 14;
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
    adBanner: { flexDirection: 'row', alignItems: 'center', backgroundColor: tc.theme.colors.surface, borderWidth: 1, borderColor: tc.theme.colors.surfaceBorder, borderRadius: 10, padding: 12, gap: 8, marginTop: 4 },
    adBadge: { fontSize: 8, color: tc.theme.colors.textSecondary }, adText: { flex: 1, fontSize: 11, color: tc.theme.colors.textSecondary },
    adCta: { fontSize: 10, color: tc.theme.colors.primary, fontWeight: '600' },
    card: { backgroundColor: tc.theme.colors.surface, borderWidth: 1, borderColor: tc.theme.colors.surfaceBorder, borderRadius: 14, padding: 16, marginBottom: 14 },
    cardTitle: { fontSize: 12, color: tc.theme.colors.textSecondary, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.8 },
    logEntry: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 6 },
    logDot: { width: 8, height: 8, borderRadius: 4 },
    logInfo: { flex: 1 },
    logLabel: { fontSize: 13, color: tc.theme.colors.text, fontWeight: '500' },
    logTime: { fontSize: 11, color: tc.theme.colors.textSecondary, marginTop: 1 },
    logCheck: { fontSize: 11, color: tc.theme.colors.success },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', padding: 20 },
    modalContent: { backgroundColor: tc.theme.colors.background, borderRadius: 20, padding: 28, borderWidth: 1, borderColor: tc.theme.colors.surfaceBorder },
  }));

  const [streak, setStreak] = useState({ current: 0, longest: 0, total: 0, curfewRate: 0 });
  const [todayLog, setTodayLog] = useState<any>(null);
  const [recentLogs, setRecentLogs] = useState<any[]>([]);
  const [targetBedtime, setTargetBedtime] = useState('23:00');
  const [showBedtimeModal, setShowBedtimeModal] = useState(false);
  const [note, setNote] = useState('');

  const loadData = useCallback(async () => {
    const today = new Date().toISOString().slice(0, 10);
    const [log, st, recent, target] = await Promise.all([
      getTodayLog(today), getStreak(), getRecentLogs(7), getSetting('target_bedtime'),
    ]);
    setTodayLog(log); setStreak(st); setRecentLogs(recent);
    if (target) setTargetBedtime(target);
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

  const br = btnRadius(theme.button.style);
  const activeFont = resolveFont(theme.font);
  const bgPhoto = theme.background.type === 'photo' ? theme.background.photoPath : null;
  const Wrapper = bgPhoto ? ImageBackground : View;
  const wrapProps = bgPhoto ? { source: { uri: bgPhoto } as any, style: s.container, imageStyle: { opacity: 0.3 } } : { style: s.container };

  return (
    <Wrapper {...wrapProps}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        <Text style={[s.greeting, activeFont && { fontFamily: activeFont }]}>{t('home.greeting.night')}</Text>
        <Text style={s.targetText}>{t('home.target')} {targetBedtime}</Text>

        <View style={s.streakRow}>
          <View style={s.streakItem}><Text style={[s.streakNum, { color: theme.colors.primary }]}>{streak.current}</Text><Text style={s.streakLabel}>{t('home.streak')}</Text></View>
          <View style={s.streakItem}><Text style={[s.streakNum, { color: theme.colors.warning }]}>{streak.curfewRate}%</Text><Text style={s.streakLabel}>{t('home.curfew.rate')}</Text></View>
          <View style={s.streakItem}><Text style={[s.streakNum, { color: theme.colors.success }]}>--</Text><Text style={s.streakLabel}>{t('home.sleep')}</Text></View>
        </View>

        {!todayLog?.bedtime && (
          <TouchableOpacity onPress={() => setShowBedtimeModal(true)} activeOpacity={0.8}
            style={{ backgroundColor: theme.colors.primary, padding: 16, alignItems: 'center', borderRadius: br, shadowColor: theme.colors.primary, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.25, shadowRadius: 32, elevation: 8 }}>
            <Text style={{ color: '#fff', fontSize: 17, fontWeight: '600' }}>{t('home.bedtime')}</Text>
            <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 2 }}>{t('home.bedtime.sub')}</Text>
          </TouchableOpacity>
        )}
        {todayLog?.bedtime && !todayLog?.waketime && (
          <TouchableOpacity onPress={handleWakeup} activeOpacity={0.8}
            style={{ backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.surfaceBorder, borderRadius: br, padding: 14, alignItems: 'center', marginTop: 8, marginBottom: 16 }}>
            <Text style={{ color: theme.colors.text, fontSize: 16, fontWeight: '500' }}>{t('home.wakeup')}</Text>
          </TouchableOpacity>
        )}
        {todayLog?.bedtime && todayLog?.waketime && (
          <View style={{ backgroundColor: theme.colors.success + '14', borderWidth: 1, borderColor: theme.colors.success + '25', borderRadius: 14, padding: 16, alignItems: 'center', marginBottom: 16 }}>
            <Text style={{ color: theme.colors.success, fontSize: 16, fontWeight: '600' }}>{t('home.completed')}</Text>
            <Text style={{ color: theme.colors.textSecondary, fontSize: 12, marginTop: 4 }}>{t('report.bedtime')} {todayLog.bedtime} · {t('report.wakeup')} {todayLog.waketime}</Text>
          </View>
        )}

        {recentLogs.length > 0 && (
          <View style={s.card}>
            <Text style={s.cardTitle}>{t('home.recent')}</Text>
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
            <Text style={{ fontSize: 22, fontWeight: '700', textAlign: 'center', color: theme.colors.text, marginBottom: 8 }}>{t('home.bedtime')}</Text>
            <Text style={{ fontSize: 14, color: theme.colors.textSecondary, textAlign: 'center', lineHeight: 20, marginBottom: 20 }}>{t('home.modal.desc')}</Text>
            <TextInput style={{ backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.surfaceBorder, borderRadius: 10, padding: 12, fontSize: 14, color: theme.colors.text, marginBottom: 16 }}
              placeholder={t('home.note.placeholder')} placeholderTextColor={theme.colors.textSecondary} value={note} onChangeText={setNote} />
            <TouchableOpacity onPress={handleBedtime} style={{ backgroundColor: theme.colors.primary, borderRadius: 12, padding: 14, alignItems: 'center' }}>
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>{t('home.confirm.bedtime')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowBedtimeModal(false)} style={{ padding: 12, alignItems: 'center', marginTop: 8 }}>
              <Text style={{ color: theme.colors.textSecondary, fontSize: 14 }}>{t('home.cancel')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Wrapper>
  );
}
