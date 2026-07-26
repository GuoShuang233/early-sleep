import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { presetThemes, PresetKey } from '../theme/themes';

const presetList: { key: PresetKey; icon: string; label: string }[] = [
  { key: 'dark-precision', icon: '🌙', label: '暗色精确' },
  { key: 'warm-night', icon: '🔮', label: '暖色助眠' },
  { key: 'nature-calm', icon: '🌿', label: '自然简约' },
  { key: 'minimal-light', icon: '☀️', label: '极简亮色' },
];

export default function SettingsScreen() {
  const { theme, setPreset, setCustom, currentPreset, autoSwitch, setAutoSwitch, isDark } = useTheme();

  return (
    <View style={[s.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={s.scroll}>
        <Text style={[s.title, { color: theme.colors.text }]}>⚙️ 设置</Text>

        {/* Theme Presets */}
        <Text style={s.sectionTitle}>主题</Text>
        <View style={s.presetRow}>
          {presetList.map((p) => (
            <TouchableOpacity
              key={p.key}
              style={[s.presetItem, {
                backgroundColor: theme.colors.surface,
                borderColor: currentPreset === p.key ? theme.colors.primary : theme.colors.surfaceBorder,
              }]}>
              <Text style={s.presetIcon}>{p.icon}</Text>
              <Text style={[s.presetLabel, {
                color: currentPreset === p.key ? theme.colors.primary : theme.colors.textSecondary,
              }]}>{p.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Auto Switch */}
        <View style={s.toggleRow}>
          <View>
            <Text style={[s.toggleLabel, { color: theme.colors.text }]}>日夜自动切换</Text>
            <Text style={s.toggleDesc}>白天亮色 · 夜晚深色</Text>
          </View>
          <TouchableOpacity
            onPress={() => setAutoSwitch(!autoSwitch)}
            style={[s.toggle, { backgroundColor: autoSwitch ? theme.colors.primary : theme.colors.textSecondary }]}>
            <View style={[s.toggleKnob, { alignSelf: autoSwitch ? 'flex-end' : 'flex-start' }]} />
          </TouchableOpacity>
        </View>

        {/* Custom Background */}
        <View style={[s.uploadBox, { borderColor: theme.colors.primary + '30' }]}>
          <Text style={{ fontSize: 22, textAlign: 'center' }}>🖼️</Text>
          <Text style={[s.uploadText, { color: theme.colors.textSecondary }]}>点击上传照片作为背景</Text>
          <Text style={s.uploadHint}>自动叠加暗色遮罩 + 模糊</Text>
        </View>

        {/* Customization Grid */}
        <Text style={s.sectionTitle}>自定义</Text>
        <View style={s.customGrid}>
          <Chip icon="🎨" label="颜色" active />
          <Chip icon="🎪" label="按钮" />
          <Chip icon="🌱" label="伙伴" />
          <Chip icon="🖼️" label="背景" />
          <Chip icon="🔊" label="音效" />
          <Chip icon="🔠" label="字体" />
          <Chip icon="📊" label="密度" />
          <Chip icon="🎬" label="动效" />
        </View>

        {/* Export/Import */}
        <View style={s.exportRow}>
          <TouchableOpacity style={[s.exportBtn, { borderColor: theme.colors.surfaceBorder }]}>
            <Text style={s.exportText}>📤 导出主题</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[s.exportBtn, { borderColor: theme.colors.primary + '40' }]}>
            <Text style={[s.exportText, { color: theme.colors.primary }]}>📥 导入主题</Text>
          </TouchableOpacity>
        </View>

        {/* Settings List */}
        <Text style={s.sectionTitle}>偏好</Text>
        <SettingRow label="🌙 目标就寝" desc="到点提醒你" value="23:00" />
        <SettingRow label="☀️ 目标起床" desc="调整生物钟" value="07:30" />
        <SettingRow label="🔔 睡前提醒" desc="推送通知" value="已开启" />
        <SettingRow label="💤 健康数据" desc="读取系统睡眠" value="可选" />

        {/* Ad */}
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

function Chip({ icon, label, active }: { icon: string; label: string; active?: boolean }) {
  const { theme } = useTheme();
  return (
    <TouchableOpacity style={[s.chip, {
      backgroundColor: active ? theme.colors.primary + '18' : theme.colors.surface,
      borderColor: active ? theme.colors.primary + '40' : theme.colors.surfaceBorder,
    }]}>
      <Text style={[s.chipIcon, active && { color: theme.colors.primary }]}>{icon}</Text>
      <Text style={[s.chipLabel, active && { color: theme.colors.primary }]}>{label}</Text>
    </TouchableOpacity>
  );
}

function SettingRow({ label, desc, value }: { label: string; desc: string; value: string }) {
  const { theme } = useTheme();
  return (
    <View style={[s.settingRow, { borderBottomColor: theme.colors.surfaceBorder }]}>
      <View>
        <Text style={[s.settingLabel, { color: theme.colors.text }]}>{label}</Text>
        <Text style={s.settingDesc}>{desc}</Text>
      </View>
      <Text style={[s.settingValue, { color: theme.colors.textSecondary }]}>{value}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 20, paddingBottom: 80 },
  title: { fontSize: 18, fontWeight: '600', marginBottom: 16 },
  sectionTitle: { fontSize: 11, color: '#4a4a5a', fontWeight: '600', marginTop: 16, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.8 },
  presetRow: { flexDirection: 'row', gap: 6, marginBottom: 12 },
  presetItem: { flex: 1, alignItems: 'center', padding: 10, borderWidth: 1, borderRadius: 10 },
  presetIcon: { fontSize: 20 },
  presetLabel: { fontSize: 9, marginTop: 4, textAlign: 'center' },
  toggleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  toggleLabel: { fontSize: 14, fontWeight: '500' },
  toggleDesc: { fontSize: 11, color: '#4a4a5a', marginTop: 2 },
  toggle: { width: 44, height: 24, borderRadius: 12, justifyContent: 'center', paddingHorizontal: 2 },
  toggleKnob: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#fff' },
  uploadBox: { borderWidth: 2, borderStyle: 'dashed', borderRadius: 12, padding: 16, alignItems: 'center', marginBottom: 16 },
  uploadText: { fontSize: 12, marginTop: 6 },
  uploadHint: { fontSize: 9, color: '#4a4a5a', marginTop: 2 },
  customGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 16 },
  chip: { paddingVertical: 10, paddingHorizontal: 14, borderWidth: 1, borderRadius: 10, alignItems: 'center', minWidth: 60 },
  chipIcon: { fontSize: 16 },
  chipLabel: { fontSize: 8, color: '#4a4a5a', marginTop: 2 },
  exportRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  exportBtn: { flex: 1, padding: 12, borderWidth: 1, borderRadius: 10, alignItems: 'center' },
  exportText: { fontSize: 11, fontWeight: '500' },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1 },
  settingLabel: { fontSize: 14 },
  settingDesc: { fontSize: 11, color: '#4a4a5a', marginTop: 2 },
  settingValue: { fontSize: 13 },
  ad: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.02)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)', borderRadius: 10,
    padding: 12, gap: 8, marginTop: 16,
  },
  adBadge: { fontSize: 7, color: '#4a4a5a' },
  adText: { flex: 1, fontSize: 11, color: '#8a8f98' },
  adCta: { fontSize: 10, color: '#7170ff', fontWeight: '600' },
});
