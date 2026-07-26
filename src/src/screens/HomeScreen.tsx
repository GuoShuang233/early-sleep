import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Modal, ImageBackground } from 'react-native'
import { T } from '../theme/T';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from '../theme/ThemeContext';
import { useI18n } from '../i18n/I18nContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemedStyles } from '../theme/useThemedStyles';
import { resolveFont } from '../theme/fonts';
import { getTodayLog, logBedtime, logWaketime, getStreak, getRecentLogs, getSetting } from '../data/database';

function btnRadius(style: string) {
  if (style === 'pill') return 30;
  if (style === 'sharp') return 0;
  if (['cat', 'bear', 'owl', 'star'].includes(style)) return 24;
  return 14;
}

function btnExtra(btn: any, colors: any) {
  const s = btn?.style || 'rounded';
  const r: any = {};
  if (s === 'glow') { r.shadowOpacity = 0.6; r.shadowRadius = 35; r.elevation = 12; r.borderWidth = 0; }
  else if (s === 'outline') { r.borderWidth = 2.5; r.borderColor = colors.primary; r.backgroundColor = 'transparent'; }
  else if (s === '3d') { r.borderBottomWidth = 6; r.borderBottomColor = colors.primary + 'aa'; r.borderLeftWidth = 1; r.borderRightWidth = 1; r.borderLeftColor = colors.primary + '30'; r.borderRightColor = colors.primary + '30'; }
  else if (s === 'pill') { r.paddingVertical = 18; }
  else if (s === 'cat') { r.backgroundColor = '#ff9eb5'; r.borderTopLeftRadius = 4; r.borderTopRightRadius = 24; r.borderBottomLeftRadius = 24; r.borderBottomRightRadius = 4; }
  else if (s === 'bear') { r.backgroundColor = '#c4a882'; r.borderRadius = 28; }
  else if (s === 'owl') { r.backgroundColor = '#8b6f9e'; r.borderTopLeftRadius = 24; r.borderTopRightRadius = 4; r.borderBottomLeftRadius = 4; r.borderBottomRightRadius = 24; }
  else if (s === 'star') { r.backgroundColor = '#f7d44a'; r.transform = [{ rotate: '-2deg' }]; }
  else if (s === 'sharp') { r.borderWidth = 1; r.borderColor = colors.primary + '40'; }
  return r;
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

  useFocusEffect(loadData);

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
  const bExtra = btnExtra(theme.button, theme.colors);
  const Wrapper = bgPhoto ? ImageBackground : View;
  const wrapProps = bgPhoto ? { source: { uri: bgPhoto } as any, style: s.container, imageStyle: { opacity: 0.3 } } : { style: s.container };

  return (
    <Wrapper {...wrapProps}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        <T style={[s.greeting, activeFont && { fontFamily: activeFont }]}>{t('home.greeting.night')}</T>
        <T style={s.targetText}>{t('home.target')} {targetBedtime}</T>

        <View style={s.streakRow}>
          <View style={s.streakItem}><T style={[s.streakNum, { color: theme.colors.primary }]}>{streak.current}</T><T style={s.streakLabel}>{t('home.streak')}</T></View>
          <View style={s.streakItem}><T style={[s.streakNum, { color: theme.colors.warning }]}>{streak.curfewRate}%</T><T style={s.streakLabel}>{t('home.curfew.rate')}</T></View>
          <View style={s.streakItem}><T style={[s.streakNum, { color: theme.colors.success }]}>--</T><T style={s.streakLabel}>{t('home.sleep')}</T></View>
        </View>

        {!todayLog?.bedtime && (
          <TouchableOpacity onPress={() => setShowBedtimeModal(true)} activeOpacity={0.8}
            style={{ backgroundColor: theme.colors.primary, padding: 16, alignItems: 'center', borderRadius: br, ...bExtra, shadowColor: theme.colors.primary, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.25, shadowRadius: 32, elevation: 8 }}>
            <T style={{ color: '#fff', fontSize: 17, fontWeight: '600' }}>{t('home.bedtime')}</T>
            <T style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 2 }}>{t('home.bedtime.sub')}</T>
          </TouchableOpacity>
        )}
        {todayLog?.bedtime && !todayLog?.waketime && (
          <TouchableOpacity onPress={handleWakeup} activeOpacity={0.8}
            style={{ backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.surfaceBorder, borderRadius: br, ...bExtra, padding: 14, alignItems: 'center', marginTop: 8, marginBottom: 16 }}>
            <T style={{ color: theme.colors.text, fontSize: 16, fontWeight: '500' }}>{t('home.wakeup')}</T>
          </TouchableOpacity>
        )}
        {todayLog?.bedtime && todayLog?.waketime && (
          <View style={{ backgroundColor: theme.colors.success + '14', borderWidth: 1, borderColor: theme.colors.success + '25', borderRadius: 14, padding: 16, alignItems: 'center', marginBottom: 16 }}>
            <T style={{ color: theme.colors.success, fontSize: 16, fontWeight: '600' }}>{t('home.completed')}</T>
            <T style={{ color: theme.colors.textSecondary, fontSize: 12, marginTop: 4 }}>{t('report.bedtime')} {todayLog.bedtime} · {t('report.wakeup')} {todayLog.waketime}</T>
          </View>
        )}

        {recentLogs.length > 0 && (
          <View style={s.card}>
            <T style={s.cardTitle}>{t('home.recent')}</T>
            {recentLogs.map((log, i) => (
              <View key={i} style={s.logEntry}>
                <View style={[s.logDot, { backgroundColor: log.phone_curfew_kept ? theme.colors.success : theme.colors.warning }]} />
                <View style={s.logInfo}>
                  <T style={s.logLabel}>{log.log_date}</T>
                  <T style={s.logTime}>{log.bedtime || '--'} → {log.waketime || '--'}{log.note ? ` · ${log.note}` : ''}</T>
                </View>
                {log.phone_curfew_kept ? <T style={s.logCheck}>✅</T> : null}
              </View>
            ))}
          </View>
        )}

        <View style={s.adBanner}>
          <T style={s.adBadge}>广告</T>
          <T style={{ fontSize: 14 }}>🛏️</T>
          <T style={s.adText}>{t('calendar.ad')}</T>
          <T style={s.adCta}>{t('home.detail')}</T>
        </View>
      </ScrollView>

      <Modal visible={showBedtimeModal} transparent animationType="fade">
        <View style={s.modalOverlay}>
          <View style={s.modalContent}>
            <T style={{ fontSize: 22, fontWeight: '700', textAlign: 'center', color: theme.colors.text, marginBottom: 8 }}>{t('home.bedtime')}</T>
            <T style={{ fontSize: 14, color: theme.colors.textSecondary, textAlign: 'center', lineHeight: 20, marginBottom: 20 }}>{t('home.modal.desc')}</T>
            <TextInput style={{ backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.surfaceBorder, borderRadius: 10, padding: 12, fontSize: 14, color: theme.colors.text, marginBottom: 16 }}
              placeholder={t('home.note.placeholder')} placeholderTextColor={theme.colors.textSecondary} value={note} onChangeText={setNote} />
            <TouchableOpacity onPress={handleBedtime} style={{ backgroundColor: theme.colors.primary, borderRadius: 12, padding: 14, alignItems: 'center' }}>
              <T style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>{t('home.confirm.bedtime')}</T>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowBedtimeModal(false)} style={{ padding: 12, alignItems: 'center', marginTop: 8 }}>
              <T style={{ color: theme.colors.textSecondary, fontSize: 14 }}>{t('home.cancel')}</T>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Wrapper>
  );
}
