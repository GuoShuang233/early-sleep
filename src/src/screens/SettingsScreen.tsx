import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Modal } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useI18n } from '../i18n/I18nContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemedStyles } from '../theme/useThemedStyles';
import { PresetKey } from '../theme/themes';
import { ColorPickerModal, ButtonStyleModal, CompanionModal, FontModal } from '../components/CustomizationModals';

const presetList: { key: PresetKey; icon: string; label: string; desc: string }[] = [
  { key: 'dark-precision', icon: '🌙', label: '暗色精确', desc: 'Linear 风格·深色' },
  { key: 'warm-night', icon: '🔮', label: '暖色助眠', desc: '紫色渐变·毛玻璃' },
  { key: 'nature-calm', icon: '🌿', label: '自然简约', desc: '深绿·植物系' },
  { key: 'minimal-light', icon: '☀️', label: '极简亮色', desc: '白天·清爽亮色' },
];

const SOUNDS_BED = [
  { key: 'rain', icon: '🌧️', labelKey: 'settings.sound.rain' },
  { key: 'ocean', icon: '🌊', labelKey: 'settings.sound.ocean' },
  { key: 'forest', icon: '🌲', labelKey: 'settings.sound.forest' },
  { key: 'whitenoise', icon: '📡', labelKey: 'settings.sound.whitenoise' },
  { key: 'fire', icon: '🔥', labelKey: 'settings.sound.fire' },
  { key: 'piano', icon: '🎹', labelKey: 'settings.sound.piano' },
];
const SOUNDS_WAKE = [
  { key: 'birds', icon: '🐦', labelKey: 'settings.sound.birds' },
  { key: 'meditation', icon: '🔔', labelKey: 'settings.sound.meditation' },
  { key: 'gentle', icon: '🎵', labelKey: 'settings.sound.gentle' },
];
const SOUNDS_FB = [
  { key: 'chord', icon: '🎶', labelKey: 'settings.sound.chord' },
  { key: 'ding', icon: '🔔', labelKey: 'settings.sound.ding' },
];

const ANIM_OPTS = ['smooth', 'reduced', 'playful', 'none'];

export default function SettingsScreen() {
  const { theme, setPreset, setCustom, currentPreset, autoSwitch, setAutoSwitch } = useTheme();
  const { t, lang, setLang, langName, supportedLangs } = useI18n();
  const insets = useSafeAreaInsets();
  const s = useThemedStyles((tCtx) => ({
    container: { flex: 1, paddingTop: insets.top, backgroundColor: tCtx.theme.colors.background },
    scroll: { padding: 20, paddingBottom: 80 },
    title: { fontSize: 18, fontWeight: '600', color: tCtx.theme.colors.text, marginBottom: 16 },
    sectionTitle: { fontSize: 11, color: tCtx.theme.colors.textSecondary, fontWeight: '600', marginTop: 16, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.8 },
    presetRow: { flexDirection: 'row', gap: 6, marginBottom: 12 },
    presetItem: { flex: 1, alignItems: 'center', padding: 12, borderWidth: 1, borderRadius: 12, backgroundColor: tCtx.theme.colors.surface },
    toggleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    chip: { paddingVertical: 10, paddingHorizontal: 14, borderWidth: 1, borderRadius: 10, alignItems: 'center', backgroundColor: tCtx.theme.colors.surface, borderColor: tCtx.theme.colors.surfaceBorder },
    layoutRow: { flexDirection: 'row', gap: 6, marginBottom: 12 },
    layoutItem: { flex: 1, alignItems: 'center', padding: 10, borderWidth: 1, borderRadius: 10, backgroundColor: tCtx.theme.colors.surface },
  }));

  const [showColor, setShowColor] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [showComp, setShowComp] = useState(false);
  const [showFont, setShowFont] = useState(false);
  const [showLang, setShowLang] = useState(false);
  const [showSound, setShowSound] = useState<'bed'|'wake'|'fb'|null>(null);
  const [showAnim, setShowAnim] = useState(false);

  const MODAL_OVERLAY = { flex: 1, backgroundColor: '#0a0a12', justifyContent: 'center', padding: 20 };
  const MODAL_BOX = { backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.surfaceBorder, borderRadius: 20, padding: 24 };

  const pick = (label: string) => {
    if (label === '颜色') setShowColor(true);
    else if (label === '按钮') setShowBtn(true);
    else if (label === '伙伴') setShowComp(true);
    else if (label === '字体') setShowFont(true);
    else if (label === '音效') setShowSound('bed');
    else if (label === '动效') setShowAnim(true);
    else if (label === '背景') Alert.alert('🖼️', t('settings.custom.upload'));
    else Alert.alert('🛠️', label);
  };

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
              <Text style={{ fontSize: 11, fontWeight: '500', marginTop: 4, color: currentPreset === p.key ? theme.colors.primary : theme.colors.text }}>{p.label}</Text>
              <Text style={{ fontSize: 8, color: theme.colors.textSecondary, marginTop: 2 }}>{p.desc}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={s.toggleRow}>
          <View>
            <Text style={{ fontSize: 14, fontWeight: '500', color: theme.colors.text }}>{t('settings.auto')}</Text>
            <Text style={{ fontSize: 11, color: theme.colors.textSecondary }}>{t('settings.auto.desc')}</Text>
          </View>
          <TouchableOpacity onPress={() => setAutoSwitch(!autoSwitch)}
            style={[{ width: 44, height: 24, borderRadius: 12, justifyContent: 'center', paddingHorizontal: 2, backgroundColor: autoSwitch ? theme.colors.primary : theme.colors.textSecondary }]}>
            <View style={[{ width: 20, height: 20, borderRadius: 10, backgroundColor: '#fff', alignSelf: autoSwitch ? 'flex-end' : 'flex-start' }]} />
          </TouchableOpacity>
        </View>

        {/* Language */}
        <Text style={s.sectionTitle}>{t('settings.language')}</Text>
        <TouchableOpacity onPress={() => setShowLang(true)}
          style={[s.chip, { alignSelf: 'flex-start', flexDirection: 'row', gap: 6 }]}>
          <Text style={{ fontSize: 14 }}>🌐</Text>
          <Text style={{ fontSize: 12, color: theme.colors.text }}>{langName}</Text>
        </TouchableOpacity>

        {/* Bedtime/Waketime */}
        <Text style={s.sectionTitle}>{t('settings.pref')}</Text>
        <SettingRow t={t} theme={theme} label={t('settings.bedtime.target')} desc="" value={theme.colors.text} />
        <SettingRow t={t} theme={theme} label={t('settings.wakeup.target')} desc="" value={theme.colors.text} />
        <SettingRow t={t} theme={theme} label={t('settings.notification')} desc="" value={theme.colors.text} />

        {/* Customization */}
        <Text style={s.sectionTitle}>{t('settings.customize')}</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
          {['颜色','按钮','伙伴','字体','音效','动效','背景'].map((label, i) => {
            const icons = ['🎨','🎪','🌱','🔠','🔊','🎬','🖼️'];
            return (
              <TouchableOpacity key={i} onPress={() => pick(label)} style={s.chip}>
                <Text style={{ fontSize: 16 }}>{icons[i]}</Text>
                <Text style={{ fontSize: 8, color: theme.colors.textSecondary, marginTop: 2 }}>{t('settings.custom.' + ['color','button','companion','font','sound','animation','background'][i])}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Sound grid (inline) */}
        {showSound && (
          <Modal visible transparent animationType="fade" onRequestClose={() => setShowSound(null)}>
            <View style={MODAL_OVERLAY}>
              <View style={MODAL_BOX}>
                <Text style={{ fontSize: 18, fontWeight: '700', color: theme.colors.text, textAlign: 'center', marginBottom: 16 }}>🔊 {t('settings.sound.bedtime')}</Text>
                <Text style={{ fontSize: 11, color: theme.colors.textSecondary, marginBottom: 8, textAlign: 'center' }}>{t('settings.sound.bedtime')}</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 12 }}>
                  {SOUNDS_BED.map((snd) => (
                    <TouchableOpacity key={snd.key} onPress={() => { setCustom({ sound: { ...theme.sound, bedtime: snd.key } }); setShowSound(null); }}
                      style={{ width: '28%', alignItems: 'center', padding: 10, borderWidth: 1, borderRadius: 12, borderColor: theme.colors.surfaceBorder, backgroundColor: theme.colors.surface }}>
                      <Text style={{ fontSize: 24 }}>{snd.icon}</Text>
                      <Text style={{ fontSize: 9, color: theme.colors.textSecondary, marginTop: 2 }}>{t(snd.labelKey)}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <Text style={{ fontSize: 11, color: theme.colors.textSecondary, marginBottom: 8, textAlign: 'center' }}>{t('settings.sound.wakeup')}</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 12 }}>
                  {SOUNDS_WAKE.map((snd) => (
                    <TouchableOpacity key={snd.key} onPress={() => { setCustom({ sound: { ...theme.sound, wakeup: snd.key } }); setShowSound(null); }}
                      style={{ width: '28%', alignItems: 'center', padding: 10, borderWidth: 1, borderRadius: 12, borderColor: theme.colors.surfaceBorder, backgroundColor: theme.colors.surface }}>
                      <Text style={{ fontSize: 24 }}>{snd.icon}</Text>
                      <Text style={{ fontSize: 9, color: theme.colors.textSecondary, marginTop: 2 }}>{t(snd.labelKey)}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <Text style={{ fontSize: 11, color: theme.colors.textSecondary, marginBottom: 8, textAlign: 'center' }}>{t('settings.sound.feedback')}</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 8 }}>
                  {SOUNDS_FB.map((snd) => (
                    <TouchableOpacity key={snd.key} onPress={() => { setCustom({ sound: { ...theme.sound, feedback: snd.key } }); setShowSound(null); }}
                      style={{ width: '28%', alignItems: 'center', padding: 10, borderWidth: 1, borderRadius: 12, borderColor: theme.colors.surfaceBorder, backgroundColor: theme.colors.surface }}>
                      <Text style={{ fontSize: 24 }}>{snd.icon}</Text>
                      <Text style={{ fontSize: 9, color: theme.colors.textSecondary, marginTop: 2 }}>{t(snd.labelKey)}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <TouchableOpacity onPress={() => setShowSound(null)} style={{ padding: 12, alignItems: 'center' }}>
                  <Text style={{ fontSize: 14, color: theme.colors.primary, fontWeight: '600' }}>{t('home.cancel')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}

        {/* Animation modal */}
        {showAnim && (
          <Modal visible transparent animationType="fade" onRequestClose={() => setShowAnim(false)}>
            <View style={MODAL_OVERLAY}>
              <View style={MODAL_BOX}>
                <Text style={{ fontSize: 18, fontWeight: '700', color: theme.colors.text, textAlign: 'center', marginBottom: 16 }}>🎬 {t('settings.custom.animation')}</Text>
                <View style={{ gap: 6 }}>
                  {ANIM_OPTS.map((a) => (
                    <TouchableOpacity key={a} onPress={() => { setCustom({ animation: a as any }); setShowAnim(false); }}
                      style={{ padding: 14, borderWidth: 1, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: theme.colors.surface, borderColor: theme.animation === a ? theme.colors.primary : theme.colors.surfaceBorder }}>
                      <Text style={{ fontSize: 14, color: theme.colors.text }}>
                        {a === 'smooth' ? '✨ ' : a === 'reduced' ? '🐢 ' : a === 'playful' ? '🎉 ' : '⏹️ '}
                        {a === 'smooth' ? t('settings.animation.smooth') : a === 'reduced' ? t('settings.animation.reduced') : a === 'playful' ? '🎉 趣味' : '⏹️ 无动画'}
                      </Text>
                      {theme.animation === a && <Text style={{ color: theme.colors.primary }}>✓</Text>}
                    </TouchableOpacity>
                  ))}
                </View>
                <TouchableOpacity onPress={() => setShowAnim(false)} style={{ padding: 12, alignItems: 'center', marginTop: 8 }}>
                  <Text style={{ fontSize: 14, color: theme.colors.primary, fontWeight: '600' }}>{t('home.cancel')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}

        {/* Language modal */}
        {showLang && (
          <Modal visible transparent animationType="fade" onRequestClose={() => setShowLang(false)}>
            <View style={MODAL_OVERLAY}>
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
            </View>
          </Modal>
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

function SettingRow({ t, theme, label, desc, value }: any) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: theme.colors.surfaceBorder }}>
      <View>
        <Text style={{ fontSize: 14, color: theme.colors.text }}>{label}</Text>
        {desc ? <Text style={{ fontSize: 11, color: theme.colors.textSecondary, marginTop: 2 }}>{desc}</Text> : null}
      </View>
      <Text style={{ fontSize: 13, color: theme.colors.textSecondary }}>{value}</Text>
    </View>
  );
}
