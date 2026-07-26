import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

const badges = [
  { icon: '🔥', name: '连续3天', unlocked: true },
  { icon: '🌿', name: '连续7天', unlocked: false },
  { icon: '🌳', name: '连续14天', unlocked: false },
  { icon: '📵', name: '宵禁铁壁', unlocked: true },
  { icon: '💤', name: '黄金8h', unlocked: false },
  { icon: '👑', name: '百日筑基', unlocked: false },
];

const companionEmoji = (type: string, stage: number) => {
  const map: Record<string, string[]> = {
    plant: ['🌱', '🌿', '🌳', '🌸', '🌲'],
    flower: ['🌰', '🌷', '🌹', '🌺', '🏵️'],
    cactus: ['🌵', '🌵', '🌵', '🌸', '🌵'],
    cat: ['🐈', '🐈', '🐱', '🐱', '👑🐱'],
    owl: ['🪺', '🐣', '🦉', '🦉', '🦉✨'],
    ocean: ['🪸', '🐠', '🐋', '🐋', '🌊✨'],
    star: ['✨', '🌙', '🌌', '🌌', '⭐🌟'],
  };
  const stages = map[type] || map.plant;
  return stages[Math.min(stage, stages.length - 1)];
};

export default function AchievementsScreen() {
  const { theme } = useTheme();
  const companionType = theme.companion.type;
  const stage = theme.companion.currentStage;

  return (
    <View style={[s.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={s.scroll}>
        <Text style={[s.title, { color: theme.colors.text }]}>🏆 成就</Text>

        {/* Companion */}
        <View style={[s.companionCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.surfaceBorder }]}>
          <Text style={s.companionEmoji}>{companionEmoji(companionType, stage)}</Text>
          <Text style={[s.companionLabel, { color: theme.colors.textSecondary }]}>
            {['种子发芽中', '茁壮成长', '郁郁葱葱', '开花结果', '完美形态'][stage] || '种子发芽中'}
          </Text>
          <View style={s.progressBar}>
            <View style={[s.progressFill, { width: `${(stage / 4) * 100}%`, backgroundColor: theme.colors.primary }]} />
          </View>
          <Text style={s.progressLabel}>连续 {(stage + 1) * 3}/{(stage + 2) * 3} 天</Text>
        </View>

        {/* Badges */}
        <Text style={s.sectionTitle}>徽章</Text>
        <View style={s.badgeGrid}>
          {badges.map((b, i) => (
            <View key={i} style={[s.badgeItem, {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.surfaceBorder,
              opacity: b.unlocked ? 1 : 0.35,
            }]}>
              <Text style={[s.badgeIcon, !b.unlocked && { opacity: 0.3 }]}>{b.icon}</Text>
              <Text style={s.badgeName}>{b.name}</Text>
            </View>
          ))}
        </View>

        {/* Ad */}
        <View style={s.ad}>
          <Text style={s.adBadge}>广告</Text>
          <Text style={{ fontSize: 14 }}>🎬</Text>
          <Text style={s.adText}>夜间助眠音乐·免费试听</Text>
          <Text style={s.adCta}>播放</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 20, paddingBottom: 80 },
  title: { fontSize: 18, fontWeight: '600', marginBottom: 16 },
  companionCard: {
    borderWidth: 1, borderRadius: 14, padding: 20, alignItems: 'center', marginBottom: 20,
  },
  companionEmoji: { fontSize: 48 },
  companionLabel: { fontSize: 13, marginVertical: 6 },
  progressBar: { height: 4, backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 2, width: '100%', overflow: 'hidden', marginVertical: 6 },
  progressFill: { height: '100%', borderRadius: 2 },
  progressLabel: { fontSize: 10, color: '#4a4a5a' },
  sectionTitle: { fontSize: 11, color: '#4a4a5a', fontWeight: '600', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.8 },
  badgeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  badgeItem: { width: '30%', alignItems: 'center', padding: 12, borderWidth: 1, borderRadius: 12, gap: 4 },
  badgeIcon: { fontSize: 24 },
  badgeName: { fontSize: 9, color: '#4a4a5a', textAlign: 'center' },
  ad: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.02)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)', borderRadius: 10,
    padding: 12, gap: 8,
  },
  adBadge: { fontSize: 7, color: '#4a4a5a' },
  adText: { flex: 1, fontSize: 11, color: '#8a8f98' },
  adCta: { fontSize: 10, color: '#7170ff', fontWeight: '600' },
});
