import React, { useState, useCallback } from 'react';
import { View, ScrollView } from 'react-native';
import { T } from '../theme/T';
import { useTheme } from '../theme/ThemeContext';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemedStyles } from '../theme/useThemedStyles';
import { getRecentLogs } from '../data/database';

export default function CalendarScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const s = useThemedStyles((t) => ({
    container: { flex: 1, paddingTop: insets.top, backgroundColor: t.theme.colors.background },
    scroll: { padding: 20, paddingBottom: 80 },
    weekHeader: { flexDirection: 'row', marginBottom: 4 },
    dayLabel: { width: '14.28%', textAlign: 'center', fontSize: 10, color: t.theme.colors.textSecondary, paddingVertical: 6 },
    dayCell: { width: '14.28%', aspectRatio: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginBottom: 2 },
    dayNum: { fontSize: 13, fontWeight: '500' },
    legend: { flexDirection: 'row', gap: 16, justifyContent: 'center', marginTop: 12 },
    legendItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    legendDot: { width: 8, height: 8, borderRadius: 4 },
    legendText: { fontSize: 10, color: t.theme.colors.textSecondary },
  }));

  const [logs, setLogs] = useState<any[]>([]);

  const loadData = useCallback(async () => {
    const recent = await getRecentLogs(60);
    setLogs(recent);
  }, []);

  useFocusEffect(loadData);

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDow = new Date(year, month, 0).getDay();

  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

  const getStatus = (day: number) => {
    const ds = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const log = logs.find((l: any) => l.log_date === ds);
    if (!log) return 0; // no data (grey)
    if (log.bedtime && log.waketime) return 2; // completed (green)
    if (log.bedtime) return 1; // bedtime only (amber)
    return 0;
  };

  const statusColors = [
    'transparent',
    theme.colors.warning,
    theme.colors.success,
  ];

  return (
    <View style={s.container}>
      <ScrollView contentContainerStyle={s.scroll}>
        <T style={{ fontSize: 18, fontWeight: '600', color: theme.colors.text, marginBottom: 12 }}>
          {year}年{month + 1}月
        </T>
        <View style={s.weekHeader}>
          {weekDays.map((d) => <T key={d} style={s.dayLabel}>{d}</T>)}
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {Array.from({ length: firstDow }, (_, i) => (
            <View key={`pad-${i}`} style={s.dayCell} />
          ))}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const status = getStatus(day);
            const isToday = day === now.getDate();
            return (
              <View key={day} style={[s.dayCell, {
                backgroundColor: status > 0 ? statusColors[status] + (status === 1 ? '30' : '20') : 'transparent',
                borderWidth: isToday ? 2 : 0,
                borderColor: isToday ? theme.colors.primary : 'transparent',
              }]}>
                <T style={[s.dayNum, { color: status > 0 ? statusColors[status] : theme.colors.text }]}>{day}</T>
              </View>
            );
          })}
        </View>
        <View style={s.legend}>
          <View style={s.legendItem}><View style={[s.legendDot, { backgroundColor: theme.colors.success }]} /><T style={s.legendText}>完整</T></View>
          <View style={s.legendItem}><View style={[s.legendDot, { backgroundColor: theme.colors.warning }]} /><T style={s.legendText}>仅就寝</T></View>
          <View style={s.legendItem}><View style={[s.legendDot, { backgroundColor: '#4a4a5a' }]} /><T style={s.legendText}>无记录</T></View>
        </View>
      </ScrollView>
    </View>
  );
}
