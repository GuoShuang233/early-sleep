import React, { useState, useCallback } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { T } from '../theme/T';
import { useTheme } from '../theme/ThemeContext';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemedStyles } from '../theme/useThemedStyles';
import { getRecentLogs } from '../data/database';

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六'];

export default function CalendarScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [logs, setLogs] = useState<any[]>([]);

  const loadData = useCallback(async () => {
    setLogs(await getRecentLogs(60));
  }, []);
  useFocusEffect(loadData);

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDow = new Date(year, month, 1).getDay();

  const s = useThemedStyles((t) => ({
    container: { flex: 1, paddingTop: insets.top, backgroundColor: t.theme.colors.background },
    scroll: { padding: 20, paddingBottom: 80 },
    title: { fontSize: 18, fontWeight: '600', color: t.theme.colors.text, marginBottom: 16 },
    weekHeader: { flexDirection: 'row', marginBottom: 8 },
    dayLabel: { width: '14.28%', textAlign: 'center', fontSize: 11, color: t.theme.colors.textSecondary, paddingVertical: 8, fontWeight: '600' },
    dayCell: { width: '14.28%', aspectRatio: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 12 },
    dayNum: { fontSize: 13 },
    legend: { flexDirection: 'row', gap: 16, justifyContent: 'center', marginTop: 16 },
    legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    legendDot: { width: 8, height: 8, borderRadius: 4 },
    legendText: { fontSize: 10, color: t.theme.colors.textSecondary },
    detailCard: { marginTop: 16, backgroundColor: t.theme.colors.surface, borderWidth: 1, borderColor: t.theme.colors.surfaceBorder, borderRadius: 14, padding: 16 },
  }));

  const getLog = (day: number) => {
    const ds = year+'-'+String(month+1).padStart(2,'0')+'-'+String(day).padStart(2,'0');
    return logs.find((l: any) => l.log_date === ds);
  };

  const padDays = Array.from({ length: firstDow }, (_, i) => i);

  return (
    <View style={s.container}>
      <ScrollView contentContainerStyle={s.scroll}>
        <T style={s.title}>{year}年{month + 1}月</T>

        <View style={s.weekHeader}>
          {WEEKDAYS.map((d) => <T key={d} style={s.dayLabel}>{d}</T>)}
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {padDays.map((i) => <View key={'p'+i} style={s.dayCell} />)}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const log = getLog(day);
            const isToday = day === now.getDate();
            const hasData = !!log;
            const isComplete = log?.bedtime && log?.waketime;
            const bg = isComplete ? theme.colors.success + '20' : hasData ? theme.colors.warning + '20' : 'transparent';
            const borderColor = isToday ? theme.colors.primary : (selectedDay === day ? theme.colors.primary + '40' : 'transparent');
            return (
              <TouchableOpacity key={day}
                onPress={() => setSelectedDay(selectedDay === day ? null : day)}
                style={[s.dayCell, { backgroundColor: bg, borderWidth: isToday || selectedDay === day ? 2 : 0, borderColor }]}>
                <T style={[s.dayNum, { color: hasData ? theme.colors.text : theme.colors.textSecondary, fontWeight: isToday ? '700' : '400' }]}>{day}</T>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={s.legend}>
          <View style={s.legendItem}><View style={[s.legendDot, { backgroundColor: theme.colors.success }]} /><T style={s.legendText}>完整</T></View>
          <View style={s.legendItem}><View style={[s.legendDot, { backgroundColor: theme.colors.warning }]} /><T style={s.legendText}>仅就寝</T></View>
          <View style={s.legendItem}><View style={[s.legendDot, { backgroundColor: '#4a4a5a' }]} /><T style={s.legendText}>无记录</T></View>
        </View>

        {selectedDay && (
          <View style={s.detailCard}>
            {(() => {
              const log = getLog(selectedDay);
              if (!log) return <T style={{ color: theme.colors.textSecondary, fontSize: 13 }}>该日无记录</T>;
              return (
                <View>
                  <T style={{ fontSize: 15, fontWeight: '600', color: theme.colors.text, marginBottom: 8 }}>
                    {year}-{String(month+1).padStart(2,'0')}-{String(selectedDay).padStart(2,'0')}
                  </T>
                  <View style={{ flexDirection: 'row', gap: 24 }}>
                    <View>
                      <T style={{ fontSize: 10, color: theme.colors.textSecondary }}>就寝</T>
                      <T style={{ fontSize: 16, color: theme.colors.text, fontWeight: '500' }}>{log.bedtime || '--'}</T>
                    </View>
                    <View>
                      <T style={{ fontSize: 10, color: theme.colors.textSecondary }}>起床</T>
                      <T style={{ fontSize: 16, color: theme.colors.text, fontWeight: '500' }}>{log.waketime || '--'}</T>
                    </View>
                    <View>
                      <T style={{ fontSize: 10, color: theme.colors.textSecondary }}>宵禁</T>
                      <T style={{ fontSize: 16, color: log.phone_curfew_kept ? theme.colors.success : theme.colors.warning }}>
                        {log.phone_curfew_kept ? '✓' : '✗'}
                      </T>
                    </View>
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
