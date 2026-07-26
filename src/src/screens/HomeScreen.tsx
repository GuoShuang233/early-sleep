import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export default function HomeScreen() {
  const { theme } = useTheme();
  const [streak] = useState(3);
  const [curfewRate] = useState(67);
  const [avgSleep] = useState('7h');

  const s = styles;

  const handleBedtime = () => {
    Alert.alert('🌙 准备睡觉', '打卡功能待实现\n（需接入本地数据库）');
  };

  const handleWakeup = () => {
    Alert.alert('☀️ 起床了', '打卡功能待实现\n（需接入本地数据库）');
  };

  const handleDetail = () => {
    Alert.alert('📋 昨晚详情', '完整报告功能待实现');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Greeting */}
        <Text style={styles.greeting}>🌙 晚上好</Text>
        <Text style={styles.targetText}>目标 23:00</Text>

        {/* Streak Row */}
        <View style={styles.streakRow}>
          <View style={styles.streakItem}>
            <Text style={[styles.streakNum, { color: theme.colors.primary }]}>{streak}</Text>
            <Text style={styles.streakLabel}>连续</Text>
          </View>
          <View style={styles.streakItem}>
            <Text style={[styles.streakNum, { color: theme.colors.warning }]}>{curfewRate}%</Text>
            <Text style={styles.streakLabel}>宵禁率</Text>
          </View>
          <View style={styles.streakItem}>
            <Text style={[styles.streakNum, { color: theme.colors.success }]}>{avgSleep}</Text>
            <Text style={styles.streakLabel}>睡眠</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <TouchableOpacity style={styles.btnSleep} onPress={handleBedtime} activeOpacity={0.8}>
          <Text style={styles.btnSleepText}>🌙 准备睡觉</Text>
          <Text style={styles.btnSleepSub}>放下手机</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnWake} onPress={handleWakeup} activeOpacity={0.8}>
          <Text style={styles.btnWakeText}>☀️ 我起床了</Text>
        </TouchableOpacity>

        {/* Log Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>昨晚</Text>
            <TouchableOpacity onPress={handleDetail}>
              <Text style={styles.cardLink}>详情 →</Text>
            </TouchableOpacity>
          </View>
          <LogRow dotColor={theme.colors.primary} label="就寝" time="23:15" check />
          <LogRow dotColor={theme.colors.success} label="起床" time="07:30" check />
          <LogRow dotColor={theme.colors.warning} label="宵禁" time="达标" check />
        </View>

        {/* Ad Banner */}
        <View style={styles.adBanner}>
          <Text style={styles.adBadge}>广告</Text>
          <Text style={styles.adIcon}>🛏️</Text>
          <Text style={styles.adText}>泰国乳胶枕·限时7折</Text>
          <Text style={styles.adCta}>了解</Text>
        </View>
      </ScrollView>
    </View>
  );
}

function LogRow({ dotColor, label, time, check }: {
  dotColor: string; label: string; time: string; check?: boolean;
}) {
  return (
    <View style={styles.logRow}>
      <View style={[styles.logDot, { backgroundColor: dotColor }]} />
      <View style={styles.logInfo}>
        <Text style={styles.logLabel}>{label}</Text>
        <Text style={styles.logTime}>{time}</Text>
      </View>
      {check && <Text style={styles.logCheck}>✅</Text>}
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#08090a' },
  scroll: { padding: 20, paddingBottom: 80 },
  greeting: { fontSize: 24, fontWeight: '600', letterSpacing: -0.3 },
  targetText: { fontSize: 13, color: '#62666d', marginTop: 2, marginBottom: 14 },
  streakRow: { flexDirection: 'row', gap: 6, marginBottom: 14 },
  streakItem: {
    flex: 1, backgroundColor: 'rgba(255,255,255,0.02)', borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: 12, alignItems: 'center',
  },
  streakNum: { fontSize: 22, fontWeight: '700' },
  streakLabel: { fontSize: 10, color: '#4a4a5a', marginTop: 3, textTransform: 'uppercase', letterSpacing: 0.5 },
  btnSleep: {
    backgroundColor: '#7170ff', padding: 16, alignItems: 'center',
    shadowColor: '#7170ff', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.25, shadowRadius: 32,
    elevation: 8,
  },
  btnSleepText: { color: '#fff', fontSize: 17, fontWeight: '600' },
  btnSleepSub: { color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 2 },
  btnWake: {
    backgroundColor: 'rgba(255,255,255,0.02)', borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)', borderRadius: 14, padding: 14,
    alignItems: 'center', marginTop: 8, marginBottom: 16,
  },
  btnWakeText: { color: '#d0d6e0', fontSize: 16, fontWeight: '500' },
  card: {
    backgroundColor: 'rgba(255,255,255,0.02)', borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)', borderRadius: 14, padding: 16, marginBottom: 14,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  cardTitle: { fontSize: 12, color: '#4a4a5a', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.8 },
  cardLink: { fontSize: 11, color: '#7170ff', fontWeight: '500' },
  logRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 6 },
  logDot: { width: 8, height: 8, borderRadius: 4 },
  logInfo: { flex: 1 },
  logLabel: { fontSize: 13, color: '#d0d6e0', fontWeight: '500' },
  logTime: { fontSize: 11, color: '#4a4a5a', marginTop: 1 },
  logCheck: { fontSize: 11, color: '#10b981' },
  adBanner: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.02)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)', borderRadius: 10,
    padding: 12, gap: 8, marginTop: 4,
  },
  adBadge: { fontSize: 8, color: '#4a4a5a' },
  adIcon: { fontSize: 14 },
  adText: { flex: 1, fontSize: 11, color: '#8a8f98' },
  adCta: { fontSize: 10, color: '#7170ff', fontWeight: '600' },
});
