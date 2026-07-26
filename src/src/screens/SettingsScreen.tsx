import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useTheme } from '../theme/ThemeContext';
import { useI18n } from '../i18n/I18nContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemedStyles } from '../theme/useThemedStyles';
import { PresetKey } from '../theme/themes';
import { getSetting, setSetting } from '../data/database';
import { ColorPickerModal, ButtonStyleModal, CompanionModal, FontModal } from '../components/CustomizationModals';

const CUSTOM = [
  { icon: '🎨', label: 'settings.custom.color', handler: 'color' },
  { icon: '🎪', label: 'settings.custom.button', handler: 'btn' },
  { icon: '🌱', label: 'settings.custom.companion', handler: 'companion' },
  { icon: '🔠', label: 'settings.custom.font', handler: 'font' },
  { icon: '🖼️', label: 'settings.custom.background', handler: 'bg' },
];

export default function SettingsScreen() {
  const { theme, setPreset, setCustom, currentPreset, autoSwitch, setAutoSwitch } = useTheme();
  const { t, lang, setLang, langName, supportedLangs } = useI18n();
  const insets = useSafeAreaInsets();
  const [showColor, setShowColor] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [showComp, setShowComp] = useState(false);
  const [showFont, setShowFont] = useState(false);
  const [showLang, setShowLang] = useState(false);
  const [showTime, setShowTime] = useState<'bed'|'wake'|null>(null);
  const [timeInput, setTimeInput] = useState('');
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
    chipIcon: { fontSize: 22 }, chipLabel: { fontSize: 9, color: tc.theme.colors.textSecondary, marginTop: 2 },
    setRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: tc.theme.colors.surfaceBorder },
    uploadBox: { borderWidth: 2, borderStyle: 'dashed', borderColor: tc.theme.colors.primary + '30', borderRadius: 12, padding: 16, alignItems: 'center', marginBottom: 16 },
  }));

  const handleBg = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.8 }, (res) => {
      if (res.assets?.[0]?.uri) {
        setCustom({ background: { ...theme.background, type: 'photo', photoPath: res.assets[0].uri } });
        Alert.alert('✅', '背景照片已设置');
      }
    });
  };

  const saveTime = async () => {
    const m = timeInput.match(/^(\d{1,2}):(\d{2})$/);
    if (!m || parseInt(m[1]) > 23 || parseInt(m[2]) > 59) {
      Alert.alert('格式错误', '请输入正确时间，如 23:00');
      return;
    }
    const val = String(m[1]).padStart(2,'0') + ':' + m[2];
    if (showTime === 'bed') { await setSetting('target_bedtime', val); setTargetBed(val); }
    else { await setSetting('target_waketime', val); setTargetWake(val); }
    setShowTime(null);
  };

  const openTime = (which: 'bed'|'wake') => {
    setTimeInput(which === 'bed' ? targetBed : targetWake);
    setShowTime(which);
  };

  return (
    <View style={s.container}>
      <ScrollView contentContainerStyle={s.scroll}>
        <Text style={s.title}>{t('settings.title')}</Text>

        {/* Theme */}
        <Text style={s.sectionTitle}>{t('settings.theme')}</Text>
        <View style={s.presetRow}>
          {(['dark-precision','warm-night','nature-calm','minimal-light'] as PresetKey[]).map((key) => {
            const icons: Record<string,string> = {'dark-precision':'🌙','warm-night':'🔮','nature-calm':'🌿','minimal-light':'☀️'};
            const labels: Record<string,string> = {'dark-precision':'暗色精确','warm-night':'暖色助眠','nature-calm':'自然简约','minimal-light':'极简亮色'};
            return (
              <TouchableOpacity key={key} onPress={() => setPreset(key)}
                style={[s.presetItem, { borderColor: currentPreset === key ? theme.colors.primary : theme.colors.surfaceBorder }]}>
                <Text style={{ fontSize: 22 }}>{icons[key]}</Text>
                <Text style={{ fontSize: 11, marginTop: 4, color: currentPreset === key ? theme.colors.primary : theme.colors.text }}>{labels[key]}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Auto switch */}
        <View style={s.toggleRow}>
          <View>
            <Text style={{ fontSize: 14, fontWeight: '500', color: theme.colors.text }}>{t('settings.auto')}</Text>
            <Text style={{ fontSize: 11, color: theme.colors.textSecondary }}>{t('settings.auto.desc')}</Text>
          </View>
          <TouchableOpacity onPress={() => setAutoSwitch(!autoSwitch)}
            style={{ width: 44, height: 24, borderRadius: 12, justifyContent: 'center', paddingHorizontal: 2, backgroundColor: autoSwitch ? theme.colors.primary : theme.colors.textSecondary }}>
            <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: '#fff', alignSelf: autoSwitch ? 'flex-end' : 'flex-start' }} />
          </TouchableOpacity>
        </View>

        {/* Language */}
        <Text style={s.sectionTitle}>{t('settings.language')}</Text>
        <TouchableOpacity onPress={() => setShowLang(true)}
          style={[s.chip, { alignSelf: 'flex-start', flexDirection: 'row', gap: 6, paddingHorizontal: 16 }]}>
          <Text style={{ fontSize: 16 }}>🌐</Text>
          <Text style={{ fontSize: 13, color: theme.colors.text }}>{langName}</Text>
        </TouchableOpacity>

        {/* Time settings */}
        <Text style={s.sectionTitle}>{t('settings.pref')}</Text>
        <View style={s.setRow}>
          <Text style={{ fontSize: 14, color: theme.colors.text }}>{t('settings.bedtime.target')}</Text>
          <TouchableOpacity onPress={() => openTime('bed')}>
            <Text style={{ fontSize: 14, color: theme.colors.primary, fontWeight: '500' }}>{targetBed}</Text>
          </TouchableOpacity>
        </View>
        <View style={s.setRow}>
          <Text style={{ fontSize: 14, color: theme.colors.text }}>{t('settings.wakeup.target')}</Text>
          <TouchableOpacity onPress={() => openTime('wake')}>
            <Text style={{ fontSize: 14, color: theme.colors.primary, fontWeight: '500' }}>{targetWake}</Text>
          </TouchableOpacity>
        </View>
        <View style={s.setRow}>
          <Text style={{ fontSize: 14, color: theme.colors.text }}>{t('settings.notification')}</Text>
          <Text style={{ fontSize: 13, color: theme.colors.textSecondary }}>{t('settings.on')}</Text>
        </View>

        {/* Customize */}
        <Text style={s.sectionTitle}>{t('settings.customize')}</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
          {CUSTOM.map((ci, i) => (
            <TouchableOpacity key={i} onPress={() => {
              if (ci.handler === 'color') setShowColor(true);
              else if (ci.handler === 'btn') setShowBtn(true);
              else if (ci.handler === 'companion') setShowComp(true);
              else if (ci.handler === 'font') setShowFont(true);
              else if (ci.handler === 'bg') handleBg();
            }} style={s.chip}>
              <Text style={s.chipIcon}>{ci.icon}</Text>
              <Text style={s.chipLabel}>{t(ci.label)}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Background upload */}
        <TouchableOpacity onPress={handleBg} style={s.uploadBox}>
          <Text style={{ fontSize: 22 }}>🖼️</Text>
          <Text style={{ fontSize: 12, color: theme.colors.textSecondary, marginTop: 6 }}>{t('settings.custom.upload')}</Text>
          <Text style={{ fontSize: 9, color: theme.colors.textSecondary }}>{t('settings.custom.upload.hint')}</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Time picker modal */}
      {(showTime === 'bed' || showTime === 'wake') && (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#0a0a12', justifyContent: 'center', padding: 20 }}>
          <View style={{ backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.surfaceBorder, borderRadius: 20, padding: 28 }}>
            <Text style={{ fontSize: 18, fontWeight: '700', color: theme.colors.text, textAlign: 'center', marginBottom: 16 }}>
              {showTime === 'bed' ? t('settings.bedtime.target') : t('settings.wakeup.target')}
            </Text>
            <TextInput
              style={{ backgroundColor: theme.colors.surface || '#222', borderWidth: 1, borderColor: theme.colors.primary, borderRadius: 12, padding: 14, fontSize: 24, color: theme.colors.text, textAlign: 'center', marginBottom: 12 }}
              value={timeInput}
              onChangeText={setTimeInput}
              placeholder="23:00"
              placeholderTextColor={theme.colors.textSecondary}
              autoFocus
              maxLength={5}
            />
            <Text style={{ fontSize: 11, color: theme.colors.textSecondary, textAlign: 'center', marginBottom: 16 }}>格式: HH:MM（24小时制）</Text>
            <TouchableOpacity onPress={saveTime} style={{ backgroundColor: theme.colors.primary, borderRadius: 12, padding: 14, alignItems: 'center' }}>
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>{t('home.confirm.bedtime')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowTime(null)} style={{ padding: 12, alignItems: 'center', marginTop: 8 }}>
              <Text style={{ color: theme.colors.textSecondary, fontSize: 14 }}>{t('home.cancel')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Language modal */}
      {showLang && (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#0a0a12', justifyContent: 'center', padding: 20 }}>
          <View style={{ backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.surfaceBorder, borderRadius: 20, padding: 24 }}>
            <Text style={{ fontSize: 18, fontWeight: '700', color: theme.colors.text, textAlign: 'center', marginBottom: 16 }}>{t('settings.language')}</Text>
            <View style={{ gap: 6 }}>
              {supportedLangs.map((l) => (
                <TouchableOpacity key={l.code} onPress={() => { setLang(l.code as any); setShowLang(false); }}
                  style={{ padding: 14, borderWidth: 1, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: theme.colors.surface, borderColor: lang === l.code ? theme.colors.primary : theme.colors.surfaceBorder }}>
                  <Text style={{ fontSize: 14, color: theme.colors.text }}>{l.name}</Text>
                  {lang === l.code && <Text style={{ color: theme.colors.primary }}>✓</Text>}
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity onPress={() => setShowLang(false)} style={{ padding: 12, alignItems: 'center', marginTop: 8 }}>
              <Text style={{ fontSize: 14, color: theme.colors.primary, fontWeight: '600' }}>{t('home.cancel')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <ColorPickerModal visible={showColor} onClose={() => setShowColor(false)}
        onSelect={(c: string) => { setCustom({ colors: { ...theme.colors, primary: c } }); setShowColor(false); }} currentColor={theme.colors.primary} />
      <ButtonStyleModal visible={showBtn} onClose={() => setShowBtn(false)}
        onSelect={(s: string) => { setCustom({ button: { ...theme.button, style: s as any } }); setShowBtn(false); }} currentStyle={theme.button.style} />
      <CompanionModal visible={showComp} onClose={() => setShowComp(false)}
        onSelect={(t: string) => { setCustom({ companion: { ...theme.companion, type: t as any } }); setShowComp(false); }} currentType={theme.companion.type} />
      <FontModal visible={showFont} onClose={() => setShowFont(false)}
        onSelect={(f: string) => { setCustom({ font: f as any }); setShowFont(false); }} currentFont={theme.font}
        onSizeSelect={(sz: string) => { setCustom({ density: sz as any }); }} currentSize={theme.density} />
    </View>
  );
}
