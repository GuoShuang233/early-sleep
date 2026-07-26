import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemedStyles } from '../theme/useThemedStyles';
import { PresetKey } from '../theme/themes';

const presetList: { key: PresetKey; icon: string; label: string; desc: string }[] = [
  { key: 'dark-precision', icon: '🌙', label: '暗色精确', desc: 'Linear 风格·深色' },
  { key: 'warm-night', icon: '🔮', label: '暖色助眠', desc: '紫色渐变·毛玻璃' },
  { key: 'nature-calm', icon: '🌿', label: '自然简约', desc: '深绿·植物系' },
  { key: 'minimal-light', icon: '☀️', label: '极简亮色', desc: '白天·清爽亮色' },
];

const customChips = [
  { icon: '🎨', label: '颜色' },
  { icon: '🎪', label: '按钮' },
  { icon: '🌱', label: '伙伴' },
  { icon: '🖼️', label: '背景' },
  { icon: '🔊', label: '音效' },
  { icon: '🔠', label: '字体' },
  { icon: '📊', label: '密度' },
  { icon: '🎬', label: '动效' },
];

export default function SettingsScreen() {
  const { theme, setPreset, currentPreset, autoSwitch, setAutoSwitch } = useTheme();
  const s = useThemedStyles((t) => ({
    container: { flex: 1, paddingTop: insets.top, backgroundColor: t.theme.colors.background },
    scroll: { padding: 20, paddingBottom: 80 },
    title: { fontSize: 18, fontWeight: '600', color: t.theme.colors.text, marginBottom: 16 },
    sectionTitle: { fontSize: 11, color: t.theme.colors.textSecondary, fontWeight: '600', marginTop: 16, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.8 },
    presetRow: { flexDirection: 'row', gap: 6, marginBottom: 12 },
    presetItem: { flex: 1, alignItems: 'center', padding: 12, borderWidth: 1, borderRadius: 12, backgroundColor: t.theme.colors.surface },
    presetIcon: { fontSize: 22 },
    presetLabel: { fontSize: 11, fontWeight: '500', marginTop: 4, color: t.theme.colors.text },
    presetDesc: { fontSize: 8, color: t.theme.colors.textSecondary, marginTop: 2 },
    toggleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    toggleLabel: { fontSize: 14, fontWeight: '500', color: t.theme.colors.text },
    toggleDesc: { fontSize: 11, color: t.theme.colors.textSecondary, marginTop: 2 },
    toggle: { width: 44, height: 24, borderRadius: 12, justifyContent: 'center', paddingHorizontal: 2 },
    toggleKnob: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#fff' },
    uploadBox: { borderWidth: 2, borderStyle: 'dashed', borderColor: t.theme.colors.primary + '30', borderRadius: 12, padding: 16, alignItems: 'center', marginBottom: 16 },
    uploadText: { fontSize: 12, color: t.theme.colors.textSecondary, marginTop: 6 },
    uploadHint: { fontSize: 9, color: t.theme.colors.textSecondary },
    customGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 16 },
    chip: { paddingVertical: 10, paddingHorizontal: 14, borderWidth: 1, borderRadius: 10, alignItems: 'center', backgroundColor: t.theme.colors.surface, borderColor: t.theme.colors.surfaceBorder },
    chipIcon: { fontSize: 16 },
    chipLabel: { fontSize: 8, color: t.theme.colors.textSecondary, marginTop: 2 },
    exportRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
    exportBtn: { flex: 1, padding: 12, borderWidth: 1, borderRadius: 10, alignItems: 'center', borderColor: t.theme.colors.surfaceBorder },
    exportText: { fontSize: 11, fontWeight: '500', color: t.theme.colors.text },
    settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: t.theme.colors.surfaceBorder },
    settingLabel: { fontSize: 14, color: t.theme.colors.text },
    settingDesc: { fontSize: 11, color: t.theme.colors.textSecondary, marginTop: 2 },
    settingValue: { fontSize: 13, color: t.theme.colors.textSecondary },
    ad: { flexDirection: 'row', alignItems: 'center', backgroundColor: t.theme.colors.surface, borderWidth: 1, borderColor: t.theme.colors.surfaceBorder, borderRadius: 10, padding: 12, gap: 8, marginTop: 16 },
    adBadge: { fontSize: 7, color: t.theme.colors.textSecondary },
    adText: { flex: 1, fontSize: 11, color: t.theme.colors.textSecondary },
    adCta: { fontSize: 10, color: t.theme.colors.primary, fontWeight: '600' },
  }));

  return (
    <View style={s.container}>
      <ScrollView contentContainerStyle={s.scroll}>
        <Text style={s.title}>⚙️ 设置</Text>

        <Text style={s.sectionTitle}>🎨 主题</Text>
        <View style={s.presetRow}>
          {presetList.map((p) => {
            const selected = currentPreset === p.key;
            return (
              <TouchableOpacity
                key={p.key}
                onPress={() => setPreset(p.key)}
                style={[s.presetItem, {
                  borderColor: selected ? theme.colors.primary : theme.colors.surfaceBorder,
                }]}>
                <Text style={s.presetIcon}>{p.icon}</Text>
                <Text style={[s.presetLabel, selected && { color: theme.colors.primary }]}>{p.label}</Text>
                <Text style={s.presetDesc}>{p.desc}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={s.toggleRow}>
          <View>
            <Text style={s.toggleLabel}>日夜自动切换</Text>
            <Text style={s.toggleDesc}>白天亮色 · 夜晚深色</Text>
          </View>
          <TouchableOpacity
            onPress={() => setAutoSwitch(!autoSwitch)}
            style={[s.toggle, { backgroundColor: autoSwitch ? theme.colors.primary : theme.colors.textSecondary }]}>
            <View style={[s.toggleKnob, { alignSelf: autoSwitch ? 'flex-end' : 'flex-start' }]} />
          </TouchableOpacity>
        </View>

        <View style={s.uploadBox}>
          <Text style={{ fontSize: 22 }}>🖼️</Text>
          <Text style={s.uploadText}>点击上传照片作为背景</Text>
          <Text style={s.uploadHint}>自动叠加暗色遮罩 + 模糊</Text>
        </View>

        <Text style={s.sectionTitle}>自定义</Text>
        <View style={s.customGrid}>
          {customChips.map((c, i) => (
            <TouchableOpacity key={i} style={s.chip}
              onPress={() => Alert.alert('🛠️ 自定义', `${c.label}自定义功能开发中`)}>
              <Text style={s.chipIcon}>{c.icon}</Text>
              <Text style={s.chipLabel}>{c.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={s.exportRow}>
          <TouchableOpacity style={s.exportBtn} onPress={() => Alert.alert("📤 导出", "主题导出功能开发中")}><Text style={s.exportText}>📤 导出主题</Text></TouchableOpacity>
          <TouchableOpacity style={[s.exportBtn, { borderColor: theme.colors.primary + '40' }]}><Text style={[s.exportText, { color: theme.colors.primary }]}>📥 导入主题</Text></TouchableOpacity>
        </View>

        <Text style={s.sectionTitle}>偏好</Text>
        <View style={s.settingRow}><View><Text style={s.settingLabel}>🌙 目标就寝</Text><Text style={s.settingDesc}>到点提醒你</Text></View><Text style={s.settingValue}>23:00</Text></View>
        <View style={s.settingRow}><View><Text style={s.settingLabel}>☀️ 目标起床</Text><Text style={s.settingDesc}>调整生物钟</Text></View><Text style={s.settingValue}>07:30</Text></View>
        <View style={s.settingRow}><View><Text style={s.settingLabel}>🔔 睡前提醒</Text><Text style={s.settingDesc}>推送通知</Text></View><Text style={s.settingValue}>已开启</Text></View>

        <View style={s.ad}>
          <Text style={s.adBadge}>广告</Text>
          <Text style={{ fontSize: 14 }}>🎬</Text>
          <Text style={s.adText}>夜间助眠音乐·免费试听</Text>
          <Text style={s.adCta}>播放</Text>
        </View>
      </ScrollView>
    </View>
  );
}
