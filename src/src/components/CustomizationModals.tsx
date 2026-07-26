import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useThemedStyles } from '../theme/useThemedStyles';

// ── Color Picker ──────────────────────────────────────────

const COLOR_PRESETS = [
  '#7170ff', '#5e6ad2', '#b8a0e0', '#80d890',
  '#10b981', '#f0b888', '#f87171', '#fbbf24',
  '#6c5ce7', '#00b894', '#e17055', '#0984e3',
  '#d63031', '#e84393', '#6c5ce7', '#00cec9',
];

export function ColorPickerModal({ visible, onClose, onSelect, currentColor }: any) {
  const s = useThemedStyles((t) => ({
    overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', padding: 20 },
    content: { backgroundColor: t.theme.colors.surface, borderWidth: 1, borderColor: t.theme.colors.surfaceBorder, borderRadius: 20, padding: 24 },
    title: { fontSize: 18, fontWeight: '700', color: t.theme.colors.text, textAlign: 'center', marginBottom: 16 },
    grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center' },
    swatch: { width: 48, height: 48, borderRadius: 12, borderWidth: 2 },
    currentRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 16, paddingTop: 12, borderTopWidth: 1, borderTopColor: t.theme.colors.surfaceBorder },
    currentLabel: { fontSize: 12, color: t.theme.colors.textSecondary },
    currentValue: { fontSize: 12, color: t.theme.colors.text, fontFamily: 'monospace' },
    closeBtn: { padding: 12, alignItems: 'center', marginTop: 8 },
    closeText: { fontSize: 14, color: t.theme.colors.primary, fontWeight: '600' },
  }));

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={s.overlay}>
        <View style={s.content}>
          <Text style={s.title}>🎨 选择主色</Text>
          <View style={s.grid}>
            {COLOR_PRESETS.map((c, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => onSelect(c)}
                style={[s.swatch, { backgroundColor: c, borderColor: c === currentColor ? '#fff' : 'transparent' }]}
              />
            ))}
          </View>
          <View style={s.currentRow}>
            <Text style={s.currentLabel}>当前颜色</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <View style={{ width: 20, height: 20, borderRadius: 6, backgroundColor: currentColor }} />
              <Text style={s.currentValue}>{currentColor}</Text>
            </View>
          </View>
          <TouchableOpacity style={s.closeBtn} onPress={onClose}>
            <Text style={s.closeText}>完成</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

// ── Button Style Picker ───────────────────────────────────

const BTN_STYLES = [
  { key: 'rounded', icon: '🟣', label: '圆角' },
  { key: 'pill', icon: '💊', label: '胶囊' },
  { key: 'sharp', icon: '⬛', label: '直角' },
  { key: 'glow', icon: '✨', label: '发光' },
  { key: 'outline', icon: '🔲', label: '描边' },
  { key: '3d', icon: '📦', label: '3D' },
  { key: 'cat', icon: '🐱', label: '猫爪' },
  { key: 'bear', icon: '🐻', label: '熊掌' },
  { key: 'owl', icon: '🦉', label: '猫头鹰' },
  { key: 'star', icon: '⭐', label: '星星' },
];

export function ButtonStyleModal({ visible, onClose, onSelect, currentStyle }: any) {
  const { theme } = useTheme();
  const s = useThemedStyles((t) => ({
    overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', padding: 20 },
    content: { backgroundColor: t.theme.colors.surface, borderWidth: 1, borderColor: t.theme.colors.surfaceBorder, borderRadius: 20, padding: 24 },
    title: { fontSize: 18, fontWeight: '700', color: t.theme.colors.text, textAlign: 'center', marginBottom: 16 },
    grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center' },
    item: { width: '28%', alignItems: 'center', padding: 10, borderWidth: 1, borderRadius: 12, backgroundColor: t.theme.colors.surface },
    itemIcon: { fontSize: 24, marginBottom: 4 },
    itemLabel: { fontSize: 10, color: t.theme.colors.textSecondary },
    closeBtn: { padding: 12, alignItems: 'center', marginTop: 8 },
    closeText: { fontSize: 14, color: t.theme.colors.primary, fontWeight: '600' },
  }));

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={s.overlay}>
        <View style={s.content}>
          <Text style={s.title}>🎪 按钮风格</Text>
          <View style={s.grid}>
            {BTN_STYLES.map((b) => (
              <TouchableOpacity
                key={b.key}
                onPress={() => onSelect(b.key)}
                style={[s.item, { borderColor: currentStyle === b.key ? theme.colors.primary : theme.colors.surfaceBorder }]}>
                <Text style={s.itemIcon}>{b.icon}</Text>
                <Text style={s.itemLabel}>{b.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={s.closeBtn} onPress={onClose}>
            <Text style={s.closeText}>完成</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

// ── Companion Picker ──────────────────────────────────────

const COMPANIONS = [
  { key: 'plant', icon: '🌱', label: '植物' },
  { key: 'flower', icon: '🌸', label: '花卉' },
  { key: 'cactus', icon: '🌵', label: '仙人掌' },
  { key: 'cat', icon: '🐱', label: '猫咪' },
  { key: 'owl', icon: '🦉', label: '猫头鹰' },
  { key: 'ocean', icon: '🐋', label: '海洋' },
  { key: 'star', icon: '⭐', label: '星空' },
];

export function CompanionModal({ visible, onClose, onSelect, currentType }: any) {
  const { theme } = useTheme();
  const s = useThemedStyles((t) => ({
    overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', padding: 20 },
    content: { backgroundColor: t.theme.colors.surface, borderWidth: 1, borderColor: t.theme.colors.surfaceBorder, borderRadius: 20, padding: 24 },
    title: { fontSize: 18, fontWeight: '700', color: t.theme.colors.text, textAlign: 'center', marginBottom: 16 },
    grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center' },
    item: { width: '28%', alignItems: 'center', padding: 12, borderWidth: 1, borderRadius: 12, backgroundColor: t.theme.colors.surface },
    itemIcon: { fontSize: 28, marginBottom: 4 },
    itemLabel: { fontSize: 10, color: t.theme.colors.textSecondary },
    closeBtn: { padding: 12, alignItems: 'center', marginTop: 8 },
    closeText: { fontSize: 14, color: t.theme.colors.primary, fontWeight: '600' },
  }));

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={s.overlay}>
        <View style={s.content}>
          <Text style={s.title}>🌱 虚拟伙伴</Text>
          <Text style={{ fontSize: 12, color: theme.colors.textSecondary, textAlign: 'center', marginBottom: 12 }}>
            随连续天数进化成长
          </Text>
          <View style={s.grid}>
            {COMPANIONS.map((c) => (
              <TouchableOpacity
                key={c.key}
                onPress={() => onSelect(c.key)}
                style={[s.item, { borderColor: currentType === c.key ? theme.colors.primary : theme.colors.surfaceBorder }]}>
                <Text style={s.itemIcon}>{c.icon}</Text>
                <Text style={s.itemLabel}>{c.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={s.closeBtn} onPress={onClose}>
            <Text style={s.closeText}>完成</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

// ── Font Picker ───────────────────────────────────────────

const FONTS = [
  { key: 'system', label: '系统默认' },
  { key: 'rounded', label: '圆体' },
  { key: 'serif', label: '衬线' },
  { key: 'handwrite', label: '手写' },
  { key: 'mono', label: '等宽' },
];

export function FontModal({ visible, onClose, onSelect, currentFont }: any) {
  const { theme } = useTheme();
  const s = useThemedStyles((t) => ({
    overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', padding: 20 },
    content: { backgroundColor: t.theme.colors.surface, borderWidth: 1, borderColor: t.theme.colors.surfaceBorder, borderRadius: 20, padding: 24 },
    title: { fontSize: 18, fontWeight: '700', color: t.theme.colors.text, textAlign: 'center', marginBottom: 16 },
    list: { gap: 6 },
    item: { padding: 14, borderWidth: 1, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: t.theme.colors.surface },
    itemLabel: { fontSize: 14, color: t.theme.colors.text },
    closeBtn: { padding: 12, alignItems: 'center', marginTop: 8 },
    closeText: { fontSize: 14, color: t.theme.colors.primary, fontWeight: '600' },
  }));

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={s.overlay}>
        <View style={s.content}>
          <Text style={s.title}>🔠 字体</Text>
          <View style={s.list}>
            {FONTS.map((f) => (
              <TouchableOpacity
                key={f.key}
                onPress={() => onSelect(f.key)}
                style={[s.item, { borderColor: currentFont === f.key ? theme.colors.primary : theme.colors.surfaceBorder }]}>
                <Text style={s.itemLabel}>{f.icon || '🔤'} {f.label}</Text>
                {currentFont === f.key && <Text style={{ color: theme.colors.primary }}>✓</Text>}
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={s.closeBtn} onPress={onClose}>
            <Text style={s.closeText}>完成</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
