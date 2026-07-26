import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
const MINUTES = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

// Compact time picker: two scrollable columns with snap behavior
export default function TimePicker({ value, onChange, onClose }: {
  value: string; onChange: (v: string) => void; onClose: () => void;
}) {
  const { theme } = useTheme();
  const [h, m] = value.split(':').map(Number);
  const [selH, setSelH] = useState(h);
  const [selM, setSelM] = useState(m);

  const ITEM_HEIGHT = 40;
  const VISIBLE = 5;
  const CONTAINER_HEIGHT = ITEM_HEIGHT * VISIBLE;

  const renderCol = (items: string[], sel: number, onSel: (v: number) => void) => (
    <View style={{ height: CONTAINER_HEIGHT, overflow: 'hidden', flex: 1 }}>
      {/* Gradient top fade */}
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: ITEM_HEIGHT * 2, zIndex: 2, 
        backgroundColor: 'transparent', borderBottomWidth: 1, borderBottomColor: theme.colors.primary + '30' }} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        contentContainerStyle={{ paddingVertical: ITEM_HEIGHT * 2 }}
        onMomentumScrollEnd={(e) => {
          const idx = Math.round(e.nativeEvent.contentOffset.y / ITEM_HEIGHT);
          onSel(Math.max(0, Math.min(items.length - 1, idx)));
        }}>
        {items.map((item, i) => (
          <View key={i} style={{ height: ITEM_HEIGHT, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{
              fontSize: i === sel ? 20 : 14,
              fontWeight: i === sel ? '700' : '400',
              color: i === sel ? theme.colors.text : theme.colors.textSecondary,
            }}>{item}</Text>
          </View>
        ))}
      </ScrollView>
      {/* Selected indicator line */}
      <View pointerEvents="none" style={{ position: 'absolute', top: ITEM_HEIGHT * 2, left: 10, right: 10, height: ITEM_HEIGHT, 
        borderRadius: 8, borderWidth: 1, borderColor: theme.colors.primary + '20', backgroundColor: theme.colors.primary + '08' }} />
      {/* Gradient bottom fade */}
      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: ITEM_HEIGHT * 2, zIndex: 2,
        borderTopWidth: 1, borderTopColor: theme.colors.primary + '30' }} />
    </View>
  );

  return (
    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', padding: 20 }}>
      <View style={{ backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.surfaceBorder, borderRadius: 20, padding: 24 }}>
        <Text style={{ fontSize: 18, fontWeight: '700', color: theme.colors.text, textAlign: 'center', marginBottom: 16 }}>选择时间</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 20, marginBottom: 16 }}>
          {renderCol(HOURS, selH, setSelH)}
          <Text style={{ fontSize: 24, color: theme.colors.text, marginTop: -CONTAINER_HEIGHT/2 + ITEM_HEIGHT*2 }}>:</Text>
          {renderCol(MINUTES, selM, setSelM)}
        </View>
        <TouchableOpacity onPress={() => onChange(`${String(selH).padStart(2,'0')}:${String(selM).padStart(2,'0')}`)}
          style={{ backgroundColor: theme.colors.primary, borderRadius: 12, padding: 14, alignItems: 'center' }}>
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>确认</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClose} style={{ padding: 12, alignItems: 'center', marginTop: 8 }}>
          <Text style={{ color: theme.colors.textSecondary, fontSize: 14 }}>取消</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
