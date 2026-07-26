import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemedStyles } from '../theme/useThemedStyles';
import { getRecentLogs } from '../data/database';

const MONTHS = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
const DAYS = ['日','一','二','三','四','五','六'];

export default function CalendarScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [logs, setLogs] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const s = useThemedStyles((t) => ({
    container: { flex: 1, paddingTop: insets.top, backgroundColor: t.theme.colors.background },
    scroll: { padding: 20, paddingBottom: 40 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    headerBtn: { padding: 10, borderRadius: 10, backgroundColor: t.theme.colors.surface, borderWidth: 1, borderColor: t.theme.colors.surfaceBorder },
    headerBtnText: { fontSize: 16, color: t.theme.colors.text },
    headerTitle: { fontSize: 18, fontWeight: '700', color: t.theme.colors.text },
    dayHeaderRow: { flexDirection: 'row', marginBottom: 4 },
    dayHeader: { width: '14.28%', alignItems: 'center', paddingVertical: 6 },
    dayHeaderText: { fontSize: 11, color: t.theme.colors.textSecondary, fontWeight: '500' },
    weekRow: { flexDirection: 'row' },
    dayCell: { width: '14.28%', alignItems: 'center', paddingVertical: 8 },
    dayNum: { fontSize: 13, fontWeight: '500', color: t.theme.colors.text },
    dayDot: { width: 5, height: 5, borderRadius: 2.5, marginTop: 2 },
    selectedDay: { backgroundColor: t.theme.colors.primary + '20', borderRadius: 8 },
    detailCard: { marginTop: 16, borderRadius: 14, padding: 16, backgroundColor: t.theme.colors.surface, borderWidth: 1, borderColor: t.theme.colors.surfaceBorder },
    detailTitle: { fontSize: 14, fontWeight: '600', color: t.theme.colors.text, marginBottom: 8 },
    detailRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
    detailLabel: { fontSize: 12, color: t.theme.colors.textSecondary },
    detailValue: { fontSize: 12, fontWeight: '500', color: t.theme.colors.text },
    noteText: { fontSize: 12, color: t.theme.colors.warning, marginTop: 4, fontStyle: 'italic' },
    emptyText: { fontSize: 12, color: t.theme.colors.textSecondary, textAlign: 'center', paddingVertical: 20 },
    ad: { flexDirection: 'row', alignItems: 'center', backgroundColor: t.theme.colors.surface, borderWidth: 1, borderColor: t.theme.colors.surfaceBorder, borderRadius: 10, padding: 12, gap: 8, marginTop: 16 },
    adBadge: { fontSize: 7, color: t.theme.colors.textSecondary },
    adText: { flex: 1, fontSize: 11, color: t.theme.colors.textSecondary },
    adCta: { fontSize: 10, color: t.theme.colors.primary, fontWeight: '600' },
  }));

  const loadData = useCallback(async () => {
    const allLogs = await getRecentLogs(365);
    setLogs(allLogs);
  }, []);
  useEffect(() => { loadData(); }, [loadData]);

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const weeks: number[][] = [];
  let week: number[] = [];
  for (let i = 0; i < firstDay; i++) week.push(0);
  for (let d = 1; d <= daysInMonth; d++) {
    week.push(d);
    if (week.length === 7) { weeks.push(week); week = []; }
  }
  if (week.length > 0) weeks.push(week);

  const getLogForDate = (day: number) => {
    const ds = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return logs.find((l: any) => l.log_date === ds);
  };

  const handleDayPress = (day: number) => {
    const ds = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(selectedDate === ds ? null : ds);
  };

  const selectedLog = selectedDate ? logs.find((l: any) => l.log_date === selectedDate) : null;

  return (
    <View style={s.container}>
      <ScrollView contentContainerStyle={s.scroll}>
        {/* Month Navigation */}
        <View style={s.header}>
          <TouchableOpacity style={s.headerBtn} onPress={() => { if (month === 0) { setYear(y => y - 1); setMonth(11); } else setMonth(m => m - 1); }}>
            <Text style={s.headerBtnText}>←</Text>
          </TouchableOpacity>
          <Text style={s.headerTitle}>{year}年 {MONTHS[month]}</Text>
          <TouchableOpacity style={s.headerBtn} onPress={() => { if (month === 11) { setYear(y => y + 1); setMonth(0); } else setMonth(m => m + 1); }}>
            <Text style={s.headerBtnText}>→</Text>
          </TouchableOpacity>
        </View>

        {/* Day Headers */}
        <View style={s.dayHeaderRow}>
          {DAYS.map((d, i) => (
            <View key={i} style={s.dayHeader}>
              <Text style={s.dayHeaderText}>{d}</Text>
            </View>
          ))}
        </View>

        {/* Weeks */}
        {weeks.map((w, wi) => (
          <View key={wi} style={s.weekRow}>
            {w.map((day, di) => {
              if (day === 0) return <View key={di} style={s.dayCell} />;
              const log = getLogForDate(day);
              const dotColor = log ? (log.phone_curfew_kept ? theme.colors.success : theme.colors.warning) : null;
              const isSelected = selectedDate === `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              return (
                <TouchableOpacity
                  key={di}
                  style={[s.dayCell, isSelected && s.selectedDay]}
                  onPress={() => handleDayPress(day)}>
                  <Text style={[s.dayNum, { opacity: day <= daysInMonth ? 1 : 0.3 }]}>{day}</Text>
                  {dotColor && <View style={[s.dayDot, { backgroundColor: dotColor }]} />}
                </TouchableOpacity>
              );
            })}
          </View>
        ))}

        {/* Selected Day Detail */}
        {selectedLog && (
          <View style={s.detailCard}>
            <Text style={s.detailTitle}>{selectedDate}</Text>
            <View style={s.detailRow}><Text style={s.detailLabel}>🌙 就寝</Text><Text style={s.detailValue}>{selectedLog.bedtime || '--'}</Text></View>
            <View style={s.detailRow}><Text style={s.detailLabel}>☀️ 起床</Text><Text style={s.detailValue}>{selectedLog.waketime || '--'}</Text></View>
            <View style={s.detailRow}><Text style={s.detailLabel}>📵 宵禁</Text><Text style={s.detailValue}>{selectedLog.phone_curfew_kept ? '✅ 达标' : '❌ 违规'}</Text></View>
            {selectedLog.note && <Text style={s.noteText}>📝 {selectedLog.note}</Text>}
          </View>
        )}
        {selectedDate && !selectedLog && (
          <View style={s.detailCard}>
            <Text style={s.detailTitle}>{selectedDate}</Text>
            <Text style={s.emptyText}>当日无记录</Text>
          </View>
        )}

        <View style={s.ad}>
          <Text style={s.adBadge}>广告</Text>
          <Text style={{ fontSize: 14 }}>🛏️</Text>
          <Text style={s.adText}>泰国乳胶枕·限时7折</Text>
          <Text style={s.adCta}>了解</Text>
        </View>
      </ScrollView>
    </View>
  );
}
