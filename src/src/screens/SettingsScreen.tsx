import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useTheme } from '../theme/ThemeContext';
import { useI18n } from '../i18n/I18nContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemedStyles } from '../theme/useThemedStyles';
import { PresetKey } from '../theme/themes';
import { getSetting, setSetting } from '../data/database';
import { ColorPickerModal, ButtonStyleModal, CompanionModal, FontModal } from '../components/CustomizationModals';

const presetList: { key: PresetKey; icon: string; label: string }[] = [
  { key: 'dark-precision', icon: '🌙', label: '暗色精确' },
  { key: 'warm-night', icon: '🔮', label: '暖色助眠' },
  { key: 'nature-calm', icon: '🌿', label: '自然简约' },
  { key: 'minimal-light', icon: '☀️', label: '极简亮色' },
];

const CUSTOM_ITEMS = [
  { icon: '🎨', labelKey: 'settings.custom.color', handler: 'color' },
  { icon: '🎪', labelKey: 'settings.custom.button', handler: 'btn' },
  { icon: '🌱', labelKey: 'settings.custom.companion', handler: 'companion' },
  { icon: '🔠', labelKey: 'settings.custom.font', handler: 'font' },
  { icon: '🖼️', labelKey: 'settings.custom.background', handler: 'bg' },
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
  const [targetBed, setTargetBed] = useState('23:00');
  const [targetWake, setTargetWake] = useState('07:30');

  useEffect(() => {
    (async () => {
      const b = await getSetting('target_bedtime');
      const w = await getSetting('target_waketime');
      if (b) setTargetBed(b);
      if (w) setTargetWake(w);
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
    chip: { padding: 12, borderWidth: 1, borderRadius: 10, alignItems: 'center', backgroundColor: tc.theme.colors.surface, borderColor: tc.theme.colors.surfaceBorder },
    chipIcon: { fontSize: 20 }, chipLabel: { fontSize: 9, color: tc.theme.colors.textSecondary, marginTop: 2 },
    setRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: tc.theme.colors.surfaceBorder },
    setLabel: { fontSize: 14, color: tc.theme.colors.text },
    setValue: { fontSize: 13, color: tc.theme.colors.textSecondary },
    uploadBox: { borderWidth: 2, borderStyle: 'dashed', borderColor: tc.theme.colors.primary + '30', borderRadius: 12, padding: 16, alignItems: 'center', marginBottom: 16 },
  }));

  const handleBgUpload = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.8 }, (res) => {
      if (res.assets?.[0]?.uri) {
        setCustom({ background: { ...theme.background, type: 'photo', photoPath: res.assets[0].uri } });
        Alert.alert('✅', '背景照片已设置');
      }
    });
  };

  const handleTimeChange = async (key: string, current: string) => {
    const newTime = current === '23:00' ? '00:00' : current === '00:00' ? '01:00' : '23:00';
    await setSetting(key, newTime);
    if (key === 'target_bedtime') setTargetBed(newTime);
    else setTargetWake(newTime);
  };

  const MODAL_OVERLAY = { flex: 1, backgroundColor: '#0a0a12', justifyContent: 'center', padding: 20 };
  const MODAL_BOX = { backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.surfaceBorder, borderRadius: 20, padding: 24 };

  return (
    <View style={s.container}>
      <ScrollView contentContainerStyle={s.scroll}>
        <Text style={s.title}>{t('settings.title')}</Text>

        {/* Theme */}
        <Text style={s.sectionTitle}>{t('settings.theme')}</Text>
        <View style={s.presetRow}>
          {presetList.map((p) => (
            <TouchableOpacity key={p.key} onPress={() => setPreset(p.key)}
              style={[s.presetItem, { borderColor: currentPreset === p.key ? theme.colors.primary : theme.colors.surfaceBorder }]}>
              <Text style={{ fontSize: 22 }}>{p.icon}</Text>
              <Text style={{ fontSize: 11, marginTop: 4, color: currentPreset === p.key ? theme.colors.primary : theme.colors.text }}>{p.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={s.toggleRow}>
          <View>
            <Text style={s.setLabel}>{t('settings.auto')}</Text>
            <Text style={{ fontSize: 11, color: theme.colors.textSecondary }}>{t('settings.auto.desc')}</Text>
          </View>
          <TouchableOpacity onPress={() => setAutoSwitch(!autoSwitch)}
            style={{ width: 44, height: 24, borderRadius: 12, justifyContent: 'center', paddingHorizontal: 2, backgroundColor: autoSwitch ? theme.colors.primary : theme.colors.textSecondary }}>
            <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: '#fff', alignSelf: autoSwitch ? 'flex-end' : 'flex-start' }} />
          </TouchableOpacity>
        </View>

        {/* Language */}
        <Text style={s.sectionTitle}>{t('settings.language')}</Text>
        <TouchableOpacity onPress={() => setShowLang(true)} style={[s.chip, { alignSelf: 'flex-start', flexDirection: 'row', gap: 6, paddingHorizontal: 16 }]}>
          <Text style={{ fontSize: 16 }}>🌐</Text>
          <Text style={{ fontSize: 13, color: theme.colors.text }}>{langName}</Text>
        </TouchableOpacity>

        {/* Preferences */}
        <Text style={s.sectionTitle}>{t('settings.pref')}</Text>
        <View style={s.setRow}>
          <View><Text style={s.setLabel}>{t('settings.bedtime.target')}</Text><Text style={{ fontSize: 10, color: theme.colors.textSecondary, marginTop: 2 }}>点击切换</Text></View>
          <TouchableOpacity onPress={() => handleTimeChange('target_bedtime', targetBed)}><Text style={[s.setValue, { color: theme.colors.primary }]}>{targetBed}</Text></TouchableOpacity>
        </View>
        <View style={s.setRow}>
          <View><Text style={s.setLabel}>{t('settings.wakeup.target')}</Text><Text style={{ fontSize: 10, color: theme.colors.textSecondary, marginTop: 2 }}>点击切换</Text></View>
          <TouchableOpacity onPress={() => handleTimeChange('target_waketime', targetWake)}><Text style={[s.setValue, { color: theme.colors.primary }]}>{targetWake}</Text></TouchableOpacity>
        </View>
        <View style={s.setRow}>
          <View><Text style={s.setLabel}>{t('settings.notification')}</Text></View>
          <Text style={s.setValue}>{t('settings.on')}</Text>
        </View>

        {/* Customize */}
        <Text style={s.sectionTitle}>{t('settings.customize')}</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
          {CUSTOM_ITEMS.map((ci, i) => (
            <TouchableOpacity key={i} onPress={() => {
              if (ci.handler === 'color') setShowColor(true);
              else if (ci.handler === 'btn') setShowBtn(true);
              else if (ci.handler === 'companion') setShowComp(true);
              else if (ci.handler === 'font') setShowFont(true);
              else if (ci.handler === 'bg') handleBgUpload();
            }} style={s.chip}>
              <Text style={s.chipIcon}>{ci.icon}</Text>
              <Text style={s.chipLabel}>{t(ci.labelKey)}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Background upload inline */}
        <TouchableOpacity onPress={handleBgUpload} style={s.uploadBox}>
          <Text style={{ fontSize: 22 }}>🖼️</Text>
          <Text style={{ fontSize: 12, color: theme.colors.textSecondary, marginTop: 6 }}>{t('settings.custom.upload')}</Text>
          <Text style={{ fontSize: 9, color: theme.colors.textSecondary }}>{t('settings.custom.upload.hint')}</Text>
        </TouchableOpacity>

        {/* Export/Import */}
        <View style={{ flexDirection: 'row', gap: 8, marginBottom: 16 }}>
          <TouchableOpacity style={{ flex: 1, padding: 12, borderWidth: 1, borderRadius: 10, alignItems: 'center', borderColor: theme.colors.surfaceBorder }}
            onPress={() => Alert.alert('📤', t('settings.export'))}>
            <Text style={{ fontSize: 11, color: theme.colors.text }}>{t('settings.export')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1, padding: 12, borderWidth: 1, borderRadius: 10, alignItems: 'center', borderColor: theme.colors.primary + '40' }}
            onPress={() => Alert.alert('📥', t('settings.import'))}>
            <Text style={{ fontSize: 11, color: theme.colors.primary }}>{t('settings.import')}</Text>
          </TouchableOpacity>
        </View>

        {/* Language Modal */}
        {showLang && (
          <ModalComp visible transparent onClose={() => setShowLang(false)}>
            <View style={MODAL_BOX}>
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
          </ModalComp>
        )}
      </ScrollView>

      <ColorPickerModal visible={showColor} onClose={() => setShowColor(false)}
        onSelect={(c: string) => { setCustom({ colors: { ...theme.colors, primary: c } }); setShowColor(false); }} currentColor={theme.colors.primary} />
      <ButtonStyleModal visible={showBtn} onClose={() => setShowBtn(false)}
        onSelect={(s: string) => { setCustom({ button: { ...theme.button, style: s as any } }); setShowBtn(false); }} currentStyle={theme.button.style} />
      <CompanionModal visible={showComp} onClose={() => setShowComp(false)}
        onSelect={(t: string) => { setCustom({ companion: { ...theme.companion, type: t as any } }); setShowComp(false); }} currentType={theme.companion.type} />
      <FontModal visible={showFont} onClose={() => setShowFont(false)}
        onSelect={(f: string) => { setCustom({ font: f as any }); setShowFont(false); }} currentFont={theme.font} />
    </View>
  );
}

// Simple transparent modal wrapper
function ModalComp({ visible, onClose, children }: any) {
  return (
    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', padding: 20 }}>
      {children}
    </View>
  );
}
