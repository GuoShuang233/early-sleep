import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native'
import { T } from '../theme/T';
import { useTheme } from '../theme/ThemeContext';
import { useThemedStyles } from '../theme/useThemedStyles';

const OVERLAY = { flex: 1, backgroundColor: '#0a0a12', justifyContent: 'center', padding: 20 };

function CloseBtn({ onClose, label }: any) {
  const { theme } = useTheme();
  return (
    <TouchableOpacity style={{ padding: 12, alignItems: 'center', marginTop: 8 }} onPress={onClose}>
      <T style={{ fontSize: 14, color: theme.colors.primary, fontWeight: '600' }}>{label || '完成'}</T>
    </TouchableOpacity>
  );
}

// ── Color Picker ──────────────────────────────────────────
const COLORS = ['#7170ff','#5e6ad2','#b8a0e0','#80d890','#10b981','#f0b888','#f87171','#fbbf24','#6c5ce7','#00b894','#e17055','#0984e3','#d63031','#e84393','#6c5ce7','#00cec9'];

export function ColorPickerModal({ visible, onClose, onSelect, currentColor }: any) {
  const { theme } = useTheme();
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={OVERLAY}>
        <View style={{ backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.surfaceBorder, borderRadius: 20, padding: 24 }}>
          <T style={{ fontSize: 18, fontWeight: '700', color: theme.colors.text, textAlign: 'center', marginBottom: 16 }}>🎨 选择主色</T>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
            {COLORS.map((c, i) => (
              <TouchableOpacity key={i} onPress={() => onSelect(c)}
                style={{ width: 48, height: 48, borderRadius: 12, backgroundColor: c, borderWidth: 2, borderColor: c === currentColor ? '#fff' : 'transparent' }} />
            ))}
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 16, paddingTop: 12, borderTopWidth: 1, borderTopColor: theme.colors.surfaceBorder }}>
            <T style={{ fontSize: 12, color: theme.colors.textSecondary }}>当前</T>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <View style={{ width: 20, height: 20, borderRadius: 6, backgroundColor: currentColor }} />
              <T style={{ fontSize: 12, color: theme.colors.text }}>{currentColor}</T>
            </View>
          </View>
          <CloseBtn onClose={onClose} />
        </View>
      </View>
    </Modal>
  );
}

// ── Button Style ──────────────────────────────────────────
const BTNS = [
  { key: 'rounded', icon: '🟣', label: '圆角' }, { key: 'pill', icon: '💊', label: '胶囊' },
  { key: 'sharp', icon: '⬛', label: '直角' }, { key: 'glow', icon: '✨', label: '发光' },
  { key: 'outline', icon: '🔲', label: '描边' }, { key: '3d', icon: '📦', label: '3D' },
  { key: 'cat', icon: '🐱', label: '猫爪' }, { key: 'bear', icon: '🐻', label: '熊掌' },
  { key: 'owl', icon: '🦉', label: '猫头鹰' }, { key: 'star', icon: '⭐', label: '星星' },
];

export function ButtonStyleModal({ visible, onClose, onSelect, currentStyle }: any) {
  const { theme } = useTheme();
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={OVERLAY}>
        <View style={{ backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.surfaceBorder, borderRadius: 20, padding: 24 }}>
          <T style={{ fontSize: 18, fontWeight: '700', color: theme.colors.text, textAlign: 'center', marginBottom: 16 }}>🎪 按钮风格</T>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
            {BTNS.map((b) => (
              <TouchableOpacity key={b.key} onPress={() => onSelect(b.key)}
                style={{ width: '28%', alignItems: 'center', padding: 10, borderWidth: 1, borderRadius: 12, borderColor: currentStyle === b.key ? theme.colors.primary : theme.colors.surfaceBorder, backgroundColor: theme.colors.surface }}>
                <T style={{ fontSize: 24, marginBottom: 4 }}>{b.icon}</T>
                <T style={{ fontSize: 10, color: theme.colors.textSecondary }}>{b.label}</T>
              </TouchableOpacity>
            ))}
          </View>
          <CloseBtn onClose={onClose} />
        </View>
      </View>
    </Modal>
  );
}

// ── Companion ─────────────────────────────────────────────
const COMPS = [
  { key: 'plant', icon: '🌱', label: '植物' }, { key: 'flower', icon: '🌸', label: '花卉' },
  { key: 'cactus', icon: '🌵', label: '仙人掌' }, { key: 'cat', icon: '🐱', label: '猫咪' },
  { key: 'owl', icon: '🦉', label: '猫头鹰' }, { key: 'ocean', icon: '🐋', label: '海洋' },
  { key: 'star', icon: '⭐', label: '星空' },
];

export function CompanionModal({ visible, onClose, onSelect, currentType }: any) {
  const { theme } = useTheme();
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={OVERLAY}>
        <View style={{ backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.surfaceBorder, borderRadius: 20, padding: 24 }}>
          <T style={{ fontSize: 18, fontWeight: '700', color: theme.colors.text, textAlign: 'center', marginBottom: 8 }}>🌱 虚拟伙伴</T>
          <T style={{ fontSize: 12, color: theme.colors.textSecondary, textAlign: 'center', marginBottom: 12 }}>随连续天数进化成长</T>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
            {COMPS.map((c) => (
              <TouchableOpacity key={c.key} onPress={() => onSelect(c.key)}
                style={{ width: '28%', alignItems: 'center', padding: 12, borderWidth: 1, borderRadius: 12, borderColor: currentType === c.key ? theme.colors.primary : theme.colors.surfaceBorder, backgroundColor: theme.colors.surface }}>
                <T style={{ fontSize: 28, marginBottom: 4 }}>{c.icon}</T>
                <T style={{ fontSize: 10, color: theme.colors.textSecondary }}>{c.label}</T>
              </TouchableOpacity>
            ))}
          </View>
          <CloseBtn onClose={onClose} />
        </View>
      </View>
    </Modal>
  );
}

// ── Font ──────────────────────────────────────────────────
const FONTS = [
  { key: 'system', label: '系统默认', preview: '系统默认字体', family: undefined as any },
  { key: 'rounded', label: '圆体', preview: '圆润可爱字体', family: 'sans-serif-rounded' as any },
  { key: 'serif', label: '衬线', preview: 'Serif 衬线体', family: 'serif' as any },
  { key: 'handwrite', label: '手写', preview: '手写风格字体', family: 'cursive' as any },
  { key: 'mono', label: '等宽', preview: '等宽字体 1234', family: 'monospace' as any },
];

export function FontModal({ visible, onClose, onSelect, currentFont, onSizeSelect, currentSize }: any) {
  const { theme } = useTheme();
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={OVERLAY}>
        <View style={{ backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.surfaceBorder, borderRadius: 20, padding: 24 }}>
          <T style={{ fontSize: 18, fontWeight: '700', color: theme.colors.text, textAlign: 'center', marginBottom: 16 }}>🔠 字体</T>
          <T style={{ fontSize: 11, color: theme.colors.textSecondary, textAlign: 'center', marginBottom: 8 }}>字体大小</T>
          <View style={{ flexDirection: 'row', gap: 6, marginBottom: 12, justifyContent: 'center' }}>
            {['small','medium','large'].map((sz) => {
              const szLabels: Record<string,string> = { small:'小', medium:'中', large:'大' };
              return (
                <TouchableOpacity key={sz} onPress={() => onSizeSelect && onSizeSelect(sz)}
                  style={{ paddingVertical: 8, paddingHorizontal: 16, borderWidth: 1, borderRadius: 8, borderColor: currentSize === sz ? theme.colors.primary : theme.colors.surfaceBorder, backgroundColor: theme.colors.surface }}>
                  <T style={{ fontSize: sz === 'small' ? 12 : sz === 'medium' ? 14 : 16, color: currentSize === sz ? theme.colors.primary : theme.colors.text }}>{szLabels[sz]}</T>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={{ gap: 6 }}>
            {FONTS.map((f) => (
              <TouchableOpacity key={f.key} onPress={() => onSelect(f.key)}
                style={{ padding: 14, borderWidth: 1, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: theme.colors.surface, borderColor: currentFont === f.key ? theme.colors.primary : theme.colors.surfaceBorder }}>
                <Text style={{ fontSize: 14, color: theme.colors.text, fontFamily: f.family }}>{f.preview}</Text>
                {currentFont === f.key && <T style={{ color: theme.colors.primary }}>✓</T>}
              </TouchableOpacity>
            ))}
          </View>
          <CloseBtn onClose={onClose} />
        </View>
      </View>
    </Modal>
  );
}
