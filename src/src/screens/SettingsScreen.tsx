import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Modal } from 'react-native'
import { T } from '../theme/T';
import { launchImageLibrary } from 'react-native-image-picker';
import TimePicker from '../components/TimePicker';
import { useTheme } from '../theme/ThemeContext';
import { useI18n } from '../i18n/I18nContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemedStyles } from '../theme/useThemedStyles';
import { PresetKey } from '../theme/themes';
import { getSetting, setSetting } from '../data/database';
import { ColorPickerModal, CompanionModal } from '../components/CustomizationModals';
import Slider from '@react-native-community/slider';

const CUSTOM = [
  { icon: '🎨', label: 'settings.custom.color', handler: 'color' },
  { icon: '🌱', label: 'settings.custom.companion', handler: 'companion' },
  { icon: '🖼️', label: 'settings.custom.background', handler: 'bg' },
];

export default function SettingsScreen() {
  const { theme, setPreset, setCustom, currentPreset, autoSwitch, setAutoSwitch, resetBackground } = useTheme();
  const { t, lang, setLang, langName, supportedLangs } = useI18n();
  const insets = useSafeAreaInsets();

  const [showColor, setShowColor] = useState(false);
  const [showComp, setShowComp] = useState(false);
  const [showLang, setShowLang] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [timeTarget, setTimeTarget] = useState<'bed'|'wake'>('bed');
  const [targetBed, setTargetBed] = useState('23:00');
  const [targetWake, setTargetWake] = useState('07:30');

  useEffect(() => {
    (async () => {
      setTargetBed(await getSetting('target_bedtime') || '23:00');
      setTargetWake(await getSetting('target_waketime') || '07:30');
    })();
  }, []);

  const s = useThemedStyles((tc) => ({
    container: { flex: 1, paddingTop: insets.top, backgroundColor: tc.theme.colors.background },
    scroll: { padding: 20, paddingBottom: 80 },
    title: { fontSize: 18, fontWeight: '600', color: tc.theme.colors.text, marginBottom: 16 },
    sectionTitle: { fontSize: 11, color: tc.theme.colors.textSecondary, fontWeight: '600', marginTop: 16, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.8 },
    presetRow: { flexDirection: 'row', gap: 6, marginBottom: 12 },
    presetItem: { flex: 1, alignItems: 'center', padding: 12, borderWidth: 1, borderRadius: 12, backgroundColor: tc.theme.colors.surface },
    toggleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    chip: { padding: 12, borderWidth: 1, borderRadius: 10, alignItems: 'center', backgroundColor: tc.theme.colors.surface, borderColor: tc.theme.colors.surfaceBorder, minWidth: 64 },
    chipIcon: { fontSize: 22 },
    chipLabel: { fontSize: 9, color: tc.theme.colors.textSecondary, marginTop: 2 },
    setRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: tc.theme.colors.surfaceBorder },
  }));

  const handleBg = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.8 }, (res) => {
      if (res.assets?.[0]?.uri) {
        setCustom({ background: { ...theme.background, type: 'photo', photoPath: res.assets[0].uri } });
        Alert.alert('✅', '背景照片已设置');
      }
    });
  };

  const openTime = (which: 'bed'|'wake') => {
    setTimeTarget(which); setShowTime(true);
  };

  return (
    <View style={s.container}>
      <ScrollView contentContainerStyle={s.scroll}>
        <T style={s.title}>{t('settings.title')}</T>

        {/* Theme Presets */}
        <T style={s.sectionTitle}>{t('settings.theme')}</T>
        <View style={s.presetRow}>
          {(['dark-precision','warm-night','nature-calm','minimal-light'] as PresetKey[]).map((key) => {
            const icons: Record<string,string> = {'dark-precision':'🌙','warm-night':'🔮','nature-calm':'🌿','minimal-light':'☀️'};
            const labels: Record<string,string> = {'dark-precision':'暗色精确','warm-night':'暖色助眠','nature-calm':'自然简约','minimal-light':'极简亮色'};
            return (
              <TouchableOpacity key={key} onPress={() => setPreset(key)}
                style={[s.presetItem, { borderColor: currentPreset === key ? theme.colors.primary : theme.colors.surfaceBorder }]}>
                <T style={{ fontSize: 22 }}>{icons[key]}</T>
                <T style={{ fontSize: 11, marginTop: 4, color: currentPreset === key ? theme.colors.primary : theme.colors.text }}>{labels[key]}</T>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Auto switch */}
        <View style={s.toggleRow}>
          <View>
            <T style={{ fontSize: 14, fontWeight: '500', color: theme.colors.text }}>{t('settings.auto')}</T>
            <T style={{ fontSize: 11, color: theme.colors.textSecondary }}>{t('settings.auto.desc')}</T>
          </View>
          <TouchableOpacity onPress={() => setAutoSwitch(!autoSwitch)}
            style={{ width: 44, height: 24, borderRadius: 12, justifyContent: 'center', paddingHorizontal: 2, backgroundColor: autoSwitch ? theme.colors.primary : theme.colors.textSecondary }}>
            <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: '#fff', alignSelf: autoSwitch ? 'flex-end' : 'flex-start' }} />
          </TouchableOpacity>
        </View>

        {/* Language */}
        <T style={s.sectionTitle}>{t('settings.language')}</T>
        <TouchableOpacity onPress={() => setShowLang(true)}
          style={[s.chip, { alignSelf: 'flex-start', flexDirection: 'row', gap: 6, paddingHorizontal: 16 }]}>
          <T style={{ fontSize: 16 }}>🌐</T>
          <T style={{ fontSize: 13, color: theme.colors.text }}>{langName}</T>
        </TouchableOpacity>

        {/* Preferences (times) */}
        <T style={s.sectionTitle}>{t('settings.pref')}</T>
        <View style={s.setRow}>
          <T style={{ fontSize: 14, color: theme.colors.text }}>{t('settings.bedtime.target')}</T>
          <TouchableOpacity onPress={() => openTime('bed')}>
            <T style={{ fontSize: 14, color: theme.colors.primary, fontWeight: '500' }}>{targetBed}</T>
          </TouchableOpacity>
        </View>
        <View style={s.setRow}>
          <T style={{ fontSize: 14, color: theme.colors.text }}>{t('settings.wakeup.target')}</T>
          <TouchableOpacity onPress={() => openTime('wake')}>
            <T style={{ fontSize: 14, color: theme.colors.primary, fontWeight: '500' }}>{targetWake}</T>
          </TouchableOpacity>
        </View>
        <View style={s.setRow}>
          <T style={{ fontSize: 14, color: theme.colors.text }}>{t('settings.notification')}</T>
          <T style={{ fontSize: 13, color: theme.colors.textSecondary }}>{t('settings.on')}</T>
        </View>

        {/* Customize */}
        <T style={s.sectionTitle}>{t('settings.customize')}</T>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
          {CUSTOM.map((ci, i) => (
            <TouchableOpacity key={i} onPress={() => {
              if (ci.handler === 'color') setShowColor(true);
              else if (ci.handler === 'companion') setShowComp(true);
              else if (ci.handler === 'bg') handleBg();
            }} style={s.chip}>
              <T style={s.chipIcon}>{ci.icon}</T>
              <T style={s.chipLabel}>{t(ci.label)}</T>
            </TouchableOpacity>
          ))}
        </View>

        {/* Background - with intensity control */}
        {theme.background.type === 'photo' && theme.background.photoPath ? (
          <View style={{ backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.surfaceBorder, borderRadius: 12, padding: 16, marginBottom: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <T style={{ fontSize: 16 }}>🖼️</T>
                <T style={{ fontSize: 12, color: theme.colors.text }}>{t('settings.bg.set')}</T>
              </View>
              <TouchableOpacity onPress={resetBackground} style={{ padding: 4 }}>
                <T style={{ fontSize: 11, color: '#f87171' }}>{t('settings.bg.reset')}</T>
              </TouchableOpacity>
            </View>
            <T style={{ fontSize: 10, color: theme.colors.textSecondary, marginTop: 10, marginBottom: 2 }}>遮罩强度  {Math.round((theme.background.overlay || 0.3) * 100)}%</T>
            <Slider
              style={{ width: '100%', height: 40 }}
              minimumValue={0}
              maximumValue={1}
              step={0.01}
              value={theme.background.overlay || 0.3}
              onValueChange={(v) => setCustom({ background: { ...theme.background, overlay: v } })}
              minimumTrackTintColor={theme.colors.primary}
              maximumTrackTintColor={theme.colors.surfaceBorder}
              thumbTintColor={theme.colors.primary}
            />
          </View>
        ) : null}
      </ScrollView>

      {/* Language modal - wrapped in RN Modal to avoid scroll clipping */}
      <Modal visible={showLang} transparent animationType="fade" onRequestClose={() => setShowLang(false)}>
        <View style={{ flex: 1, backgroundColor: '#0a0a12', justifyContent: 'center', padding: 20 }}>
          <View style={{ backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.surfaceBorder, borderRadius: 20, padding: 24 }}>
            <T style={{ fontSize: 18, fontWeight: '700', color: theme.colors.text, textAlign: 'center', marginBottom: 16 }}>{t('settings.language')}</T>
            <View style={{ gap: 6 }}>
              {supportedLangs.map((l) => (
                <TouchableOpacity key={l.code} onPress={() => { setLang(l.code as any); setShowLang(false); }}
                  style={{ padding: 14, borderWidth: 1, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: theme.colors.surface, borderColor: lang === l.code ? theme.colors.primary : theme.colors.surfaceBorder }}>
                  <T style={{ fontSize: 14, color: theme.colors.text }}>{l.name}</T>
                  {lang === l.code && <T style={{ color: theme.colors.primary }}>✓</T>}
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity onPress={() => setShowLang(false)} style={{ padding: 12, alignItems: 'center', marginTop: 8 }}>
              <T style={{ fontSize: 14, color: theme.colors.primary, fontWeight: '600' }}>{t('home.cancel')}</T>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Time picker (native wheel) */}
      {showTime && (
        <TimePicker
          value={timeTarget === 'bed' ? targetBed : targetWake}
          onChange={(val: string) => {
            if (timeTarget === 'bed') { setSetting('target_bedtime', val); setTargetBed(val); }
            else { setSetting('target_waketime', val); setTargetWake(val); }
            setShowTime(false);
          }}
          onClose={() => setShowTime(false)}
        />
      )}

      <ColorPickerModal visible={showColor} onClose={() => setShowColor(false)}
        onSelect={(c: string) => { setCustom({ colors: { ...theme.colors, primary: c } }); setShowColor(false); }} currentColor={theme.colors.primary} />
      <CompanionModal visible={showComp} onClose={() => setShowComp(false)}
        onSelect={(t: string) => { setCustom({ companion: { ...theme.companion, type: t as any } }); setShowComp(false); }} currentType={theme.companion.type} />
    </View>
  );
}

