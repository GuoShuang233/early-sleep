import React, { useState, useCallback } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { T } from '../theme/T';
import { useTheme } from '../theme/ThemeContext';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemedStyles } from '../theme/useThemedStyles';
import { getRecentLogs } from '../data/database';

const WDAYS = ['日', '一', '二', '三', '四', '五', '六'];

function completionRate(log: any): string {
  if (!log?.bedtime || !log?.waketime) return '--';
  const bh = parseInt(log.bedtime.split(':')[0]) * 60 + parseInt(log.bedtime.split(':')[1]);
  const wh = parseInt(log.waketime.split(':')[0]) * 60 + parseInt(log.waketime.split(':')[1]);
  let dur = wh - bh;
  if (dur < 0) dur += 24 * 60;
  return String(Math.min(100, Math.round(dur / 420 * 100))) + '%';
}

export default function CalendarScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [logs, setLogs] = useState<any[]>([]);

  const loadData = useCallback(async () => { setLogs(await getRecentLogs(60)); }, []);
  useFocusEffect(loadData);

  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth();
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const firstDow = new Date(y, m, 1).getDay();

  const s = useThemedStyles((t) => ({
    container: { flex: 1, paddingTop: insets.top, backgroundColor: t.theme.colors.background },
    scroll: { padding: 20, paddingBottom: 80 },
    weekRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 4 },
    dayHead: { textAlign: 'center', fontSize: 11, color: t.theme.colors.textSecondary, paddingVertical: 8, fontWeight: '600', width: 36 },
    cellOuter: { width: '14.28%', alignItems: 'center', paddingVertical: 4 },
    cell: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
    cellNum: { fontSize: 13, fontWeight: '500' },
    detail: { marginTop: 16, backgroundColor: t.theme.colors.surface, borderWidth: 1, borderColor: t.theme.colors.surfaceBorder, borderRadius: 14, padding: 16 },
  }));

  const fmtDate = (day: number) => y + '-' + String(m + 1).padStart(2, '0') + '-' + String(day).padStart(2, '0');

  const getLog = (day: number) => logs.find((l: any) => l.log_date === fmtDate(day));

  return (
    <View style={s.container}>
      <ScrollView contentContainerStyle={s.scroll}>
        <T style={{ fontSize: 18, fontWeight: '600', color: theme.colors.text, marginBottom: 16 }}>{y}年{m + 1}月</T>
        <View style={s.weekRow}>
          {WDAYS.map(d => <T key={d} style={s.dayHead}>{d}</T>)}
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {Array.from({ length: firstDow }, (_, i) => <View key={'p' + i} style={s.cellOuter} />)}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const log = getLog(day);
            const isToday = day === now.getDate();
            const ok = log?.bedtime && log?.waketime;
            const partial = !!log?.bedtime && !ok;
            const ds = fmtDate(day);
            return (
              <View key={day} style={s.cellOuter}>
                <TouchableOpacity style={[s.cell, {
                  backgroundColor: ok ? theme.colors.success + '22' : partial ? theme.colors.warning + '22' : 'transparent',
                }, isToday && { borderWidth: 2, borderColor: theme.colors.primary },
                  selectedDay === ds && { borderWidth: 2, borderColor: theme.colors.primary + '60' },
                ]} onPress={() => setSelectedDay(selectedDay === ds ? null : ds)}>
                  <T style={[s.cellNum, { color: isToday ? theme.colors.primary : theme.colors.text }]}>{day}</T>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        <View style={{ flexDirection: 'row', gap: 16, justifyContent: 'center', marginTop: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: theme.colors.success }} />
            <T style={{ fontSize: 10, color: theme.colors.textSecondary }}>完整</T>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: theme.colors.warning }} />
            <T style={{ fontSize: 10, color: theme.colors.textSecondary }}>仅就寝</T>
          </View>
        </View>

        {selectedDay && (
          <View style={s.detail}>
            {(() => {
              const log = logs.find((l: any) => l.log_date === selectedDay);
              if (!log) return <T style={{ color: theme.colors.textSecondary, fontSize: 13 }}>{selectedDay} ·  + ' ' + t('cal.nodata')}</T>;
              return (
                <View>
                  <T style={{ fontSize: 14, fontWeight: '600', color: theme.colors.text, marginBottom: 10 }}>{selectedDay}</T>
                  <View style={{ flexDirection: 'row', gap: 20, marginBottom: 6 }}>
                    <View><T style={{ fontSize: 10, color: theme.colors.textSecondary }}>{t('cal.bedtime')}</T><T style={{ fontSize: 15, color: theme.colors.text, fontWeight: '500' }}>{log.bedtime || '--'}</T></View>
                    <View><T style={{ fontSize: 10, color: theme.colors.textSecondary }}>{t('cal.wakeup')}</T><T style={{ fontSize: 15, color: theme.colors.text, fontWeight: '500' }}>{log.waketime || '--'}</T></View>
                    <View><T style={{ fontSize: 10, color: theme.colors.textSecondary }}>{t('cal.checkin')}</T><T style={{ fontSize: 15, color: (log.bedtime && log.waketime) ? theme.colors.success : theme.colors.warning }}>{(log.bedtime && log.waketime) ? '✓' : '✗'}</T></View>
                  </View>
                  <View style={{ flexDirection: 'row', gap: 20 }}>
                    <View><T style={{ fontSize: 10, color: theme.colors.textSecondary }}>{t('cal.rate')}</T><T style={{ fontSize: 15, color: theme.colors.primary, fontWeight: '500' }}>{completionRate(log)}</T></View>
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
