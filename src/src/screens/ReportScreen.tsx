import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export default function ReportScreen() {
  const { theme } = useTheme();
  const [note] = useState('加班到10点，回来晚了');

  return (
    <View style={[s.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={s.scroll}>
        {/* Header */}
        <View style={s.header}>
          <Text style={s.headerIcon}>☀️</Text>
          <Text style={[s.headerTitle, { color: theme.colors.text }]}>早上好</Text>
        </View>

        {/* Stats */}
        <StatRow icon="🌙" label="就寝" value="23:15" theme={theme} />
        <StatRow icon="☀️" label="起床" value="07:30" theme={theme} />
        <StatRow icon="💤" label="睡眠" value="7h 38m" theme={theme} />
        <StatRow icon="📵" label="宵禁" value="✅ 达标" theme={theme} valueColor={theme.colors.success} />

        {/* Note */}
        {note ? (
          <View style={s.noteBox}>
            <Text style={s.noteIcon}>📝</Text>
            <Text style={s.noteText}>{note}</Text>
          </View>
        ) : null}

        {/* App Usage */}
        <Text style={s.sectionTitle}>📱 睡前 App 使用</Text>
        <AppBar name="抖音" pct={70} time="1h20m" color={theme.colors.primary} />
        <AppBar name="微信" pct={40} time="45m" color={theme.colors.primary} />
        <AppBar name="小红书" pct={15} time="8m" color={theme.colors.primary} />

        {/* Advice */}
        <View style={[s.advice, { backgroundColor: theme.colors.primary + '12', borderColor: theme.colors.primary + '20' }]}>
          <Text style={[s.adviceText, { color: theme.colors.text }]}>
            💡 打卡后又刷了半小时。今晚试试打卡后直接放客厅充电？
          </Text>
        </View>

        <View style={s.streakRow}>
          <View style={[s.streakItem, { backgroundColor: theme.colors.surface, borderColor: theme.colors.surfaceBorder }]}>
            <Text style={[s.streakNum, { color: theme.colors.primary }]}>🔥 3</Text>
            <Text style={s.streakLabel}>连续</Text>
          </View>
          <View style={[s.streakItem, { backgroundColor: theme.colors.surface, borderColor: theme.colors.surfaceBorder }]}>
            <Text style={[s.streakNum, { color: theme.colors.warning }]}>67%</Text>
            <Text style={s.streakLabel}>宵禁率</Text>
          </View>
        </View>

        {/* Ad */}
        <View style={s.ad}>
          <Text style={s.adBadge}>广告</Text>
          <Text style={{ fontSize: 14 }}>🛏️</Text>
          <Text style={s.adText}>泰国乳胶枕·每晚好眠</Text>
          <Text style={s.adCta}>去看看</Text>
        </View>
      </ScrollView>
    </View>
  );
}

function StatRow({ icon, label, value, theme, valueColor }: any) {
  return (
    <View style={[s.statRow, { borderBottomColor: theme.colors.surfaceBorder }]}>
      <Text style={[s.statLabel, { color: theme.colors.textSecondary }]}>{icon} {label}</Text>
      <Text style={[s.statValue, { color: valueColor || theme.colors.text }]}>{value}</Text>
    </View>
  );
}

function AppBar({ name, pct, time, color }: any) {
  return (
    <View style={s.appRow}>
      <Text style={s.appName}>{name}</Text>
      <View style={s.appBarBg}>
        <View style={[s.appBarFill, { width: `${pct}%`, backgroundColor: color }]} />
      </View>
      <Text style={s.appTime}>{time}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 20, paddingBottom: 80 },
  header: { alignItems: 'center', paddingVertical: 12 },
  headerIcon: { fontSize: 36 },
  headerTitle: { fontSize: 22, fontWeight: '700', marginTop: 4 },
  statRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1 },
  statLabel: { fontSize: 13 },
  statValue: { fontSize: 13, fontWeight: '600' },
  noteBox: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(251,191,36,0.06)',
    borderWidth: 1, borderColor: 'rgba(251,191,36,0.08)', borderRadius: 8,
    padding: 8, gap: 6, marginVertical: 8,
  },
  noteIcon: { fontSize: 12 },
  noteText: { fontSize: 11, color: '#fbbf24', flex: 1 },
  sectionTitle: { fontSize: 11, color: '#4a4a5a', fontWeight: '600', marginTop: 12, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.8 },
  appRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 5 },
  appName: { width: 50, fontSize: 11, color: '#62666d' },
  appBarBg: { flex: 1, height: 14, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 7, overflow: 'hidden' },
  appBarFill: { height: '100%', borderRadius: 7 },
  appTime: { width: 40, textAlign: 'right', fontSize: 11, color: '#d0d6e0' },
  advice: {
    borderRadius: 10, padding: 12, marginVertical: 12,
  },
  adviceText: { fontSize: 12, lineHeight: 18 },
  streakRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  streakItem: { flex: 1, borderWidth: 1, borderRadius: 12, padding: 12, alignItems: 'center' },
  streakNum: { fontSize: 16, fontWeight: '700' },
  streakLabel: { fontSize: 9, color: '#4a4a5a', marginTop: 3 },
  ad: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.02)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)', borderRadius: 10,
    padding: 12, gap: 8,
  },
  adBadge: { fontSize: 7, color: '#4a4a5a' },
  adText: { flex: 1, fontSize: 11, color: '#8a8f98' },
  adCta: { fontSize: 10, color: '#7170ff', fontWeight: '600' },
});
