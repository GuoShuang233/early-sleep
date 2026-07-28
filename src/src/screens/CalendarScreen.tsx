import React, { useState, useCallback } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { T } from '../theme/T';
import { useTheme } from '../theme/ThemeContext';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemedStyles } from '../theme/useThemedStyles';
import { getRecentLogs } from '../data/database';

const WDAYS = ['日', '一', '二', '三', '四', '五', '六'];

export default function CalendarScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [logs, setLogs] = useState<any[]>([]);

  const loadData = useCallback(async () => {
    setLogs(await getRecentLogs(60));
  }, []);
  useFocusEffect(loadData);

  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth();
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const firstDow = new Date(y, m, 1).getDay();

  const s = useThemedStyles((t) => ({
    container: { flex: 1, paddingTop: insets.top, backgroundColor: t.theme.colors.background },
    scroll: { padding: 20, paddingBottom: 80 },
    weekRow: { flexDirection: 'row' },
    dayHead: { width: '14.28%', textAlign: 'center', fontSize: 11, color: t.theme.colors.textSecondary, paddingVertical: 8, fontWeight: '600' },
    cell: { width: '14.28%', aspectRatio: 1, alignItems: 'center', justifyContent: 'center' },
    cellNum: { fontSize: 12, fontWeight: '500' },
    dot: { width: 4, height: 4, borderRadius: 2, marginTop: 2 },
    detail: { marginTop: 16, backgroundColor: t.theme.colors.surface, borderWidth: 1, borderColor: t.theme.colors.surfaceBorder, borderRadius: 14, padding: 16 },
  }));

  const getLog = (day: number) => {
    const ds = y+'-'+String(m+1).padStart(2,'0')+'-'+String(day).padStart(2,'0');
    return logs.find((l: any) => l.log_date === ds);
  };

  return (
    <View style={s.container}>
      <ScrollView contentContainerStyle={s.scroll}>
        <T style={{ fontSize: 18, fontWeight: '600', color: theme.colors.text, marginBottom: 16 }}>{y}年{m + 1}月</T>

        <View style={s.weekRow}>
          {WDAYS.map(d => <T key={d} style={s.dayHead}>{d}</T>)}
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {Array.from({ length: firstDow }, (_, i) => <View key={'p'+i} style={s.cell} />)}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const log = getLog(day);
            const isToday = day === now.getDate();
            const hasCompleted = log?.bedtime && log?.waketime;
            const hasBedtime = !!log?.bedtime;
            const ds = y+'-'+String(m+1).padStart(2,'0')+'-'+String(day).padStart(2,'0');

            return (
              <TouchableOpacity key={day} style={[s.cell, { borderRadius: 8, backgroundColor: selectedDay === ds ? theme.colors.surface : 'transparent', borderWidth: isToday ? 2 : 0, borderColor: isToday ? theme.colors.primary : 'transparent' }]}
                onPress={() => setSelectedDay(selectedDay === ds ? null : ds)}>
                <T style={[s.cellNum, { color: isToday ? theme.colors.primary : theme.colors.text, fontWeight: isToday ? '700' : '500' }]}>{day}</T>
                {hasCompleted && <View style={[s.dot, { backgroundColor: theme.colors.success }]} />}
                {hasBedtime && !hasCompleted && <View style={[s.dot, { backgroundColor: theme.colors.warning }]} />}
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={{ flexDirection: 'row', gap: 16, justifyContent: 'center', marginTop: 12 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: theme.colors.success }} />
            <T style={{ fontSize: 10, color: theme.colors.textSecondary }}>完整</T>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: theme.colors.warning }} />
            <T style={{ fontSize: 10, color: theme.colors.textSecondary }}>仅就寝</T>
          </View>
        </View>

        {selectedDay && (
          <View style={s.detail}>
            {(() => {
              const parts = selectedDay.split('-').map(Number);
              const log = logs.find((l: any) => l.log_date === selectedDay);
              if (!log) return <T style={{ color: theme.colors.textSecondary, fontSize: 13 }}>{selectedDay} · 无记录</T>;
              return (
                <View>
                  <T style={{ fontSize: 14, fontWeight: '600', color: theme.colors.text, marginBottom: 10 }}>{selectedDay}</T>
                  <View style={{ flexDirection: 'row', gap: 20 }}>
                    <View><T style={{ fontSize: 10, color: theme.colors.textSecondary }}>就寝</T><T style={{ fontSize: 15, color: theme.colors.text, fontWeight: '500' }}>{log.bedtime || '--'}</T></View>
                    <View><T style={{ fontSize: 10, color: theme.colors.textSecondary }}>起床</T><T style={{ fontSize: 15, color: theme.colors.text, fontWeight: '500' }}>{log.waketime || '--'}</T></View>
                    <View><T style={{ fontSize: 10, color: theme.colors.textSecondary }}>宵禁</T><T style={{ fontSize: 15, color: log.phone_curfew_kept ? theme.colors.success : theme.colors.warning }}>{log.phone_curfew_kept ? '✓' : '✗'}</T></View>
                  </View>
                  {log.note ? <T style={{ fontSize: 11, color: theme.colors.textSecondary, marginTop: 8 }}>📝 {log.note}</T> : null}
                </View>
              );
            })()}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
