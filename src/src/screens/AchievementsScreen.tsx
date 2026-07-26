import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView } from 'react-native'
import { T } from '../theme/T';
import { useTheme } from '../theme/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemedStyles } from '../theme/useThemedStyles';
import { getStreak } from '../data/database';

const badges = [
  { icon: '🔥', name: '连续3天', min: 3 },
  { icon: '🌿', name: '连续7天', min: 7 },
  { icon: '🌳', name: '连续14天', min: 14 },
  { icon: '📵', name: '宵禁铁壁', min: 7 },
  { icon: '💤', name: '黄金8h', min: 14 },
  { icon: '👑', name: '百日筑基', min: 100 },
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

const companionStageNames: Record<string, string[]> = {
  plant: ['🌱 种子发芽中', '🌿 茁壮成长', '🌳 郁郁葱葱', '🌸 开花结果', '🌲 完美形态'],
  flower: ['🌰 种子', '🌷 萌芽', '🌹 含苞待放', '🌺 盛放', '🏵️ 满园花开'],
  cactus: ['🌵 小不点', '🌵 长个了', '🌵 挺拔', '🌸 开花啦', '🌵 仙人掌王'],
  cat: ['🐈 小奶猫', '🐈 调皮猫', '🐱 优雅猫', '🐱 威风猫', '👑🐱 猫之王'],
  owl: ['🪺 鸟蛋', '🐣 雏鸟', '🦉 小猫头鹰', '🦉 智慧之眼', '🦉✨ 森林守护者'],
  ocean: ['🪸 珊瑚', '🐠 小鱼群', '🐋 鲸鱼', '🐋 深海遨游', '🌊✨ 海洋之心'],
  star: ['✨ 星光点点', '🌙 月牙', '🌌 银河', '🌌 星云', '⭐🌟 星辰大海'],
};

const stageDefault = ['种子发芽中', '茁壮成长', '郁郁葱葱', '开花结果', '完美形态'];

export default function AchievementsScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const s = useThemedStyles((t) => ({
    container: { flex: 1, paddingTop: insets.top, backgroundColor: t.theme.colors.background },
    scroll: { padding: 20, paddingBottom: 80 },
    title: { fontSize: 18, fontWeight: '600', color: t.theme.colors.text, marginBottom: 16 },
    companionCard: { borderWidth: 1, borderColor: t.theme.colors.surfaceBorder, borderRadius: 14, padding: 20, alignItems: 'center', marginBottom: 20, backgroundColor: t.theme.colors.surface },
    companionEmoji: { fontSize: 48 },
    companionLabel: { fontSize: 13, color: t.theme.colors.textSecondary, marginVertical: 6 },
    progressBar: { height: 4, backgroundColor: t.theme.colors.surfaceBorder, borderRadius: 2, width: '100%', overflow: 'hidden', marginVertical: 6 },
    progressFill: { height: '100%', borderRadius: 2, backgroundColor: t.theme.colors.primary },
    progressLabel: { fontSize: 10, color: t.theme.colors.textSecondary },
    sectionTitle: { fontSize: 11, color: t.theme.colors.textSecondary, fontWeight: '600', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.8 },
    badgeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
    badgeItem: { width: '30%', alignItems: 'center', padding: 12, borderWidth: 1, borderRadius: 12, backgroundColor: t.theme.colors.surface, borderColor: t.theme.colors.surfaceBorder },
    badgeIcon: { fontSize: 24 },
    badgeName: { fontSize: 9, color: t.theme.colors.textSecondary, textAlign: 'center', marginTop: 4 },
    ad: { flexDirection: 'row', alignItems: 'center', backgroundColor: t.theme.colors.surface, borderWidth: 1, borderColor: t.theme.colors.surfaceBorder, borderRadius: 10, padding: 12, gap: 8 },
    adBadge: { fontSize: 7, color: t.theme.colors.textSecondary },
    adText: { flex: 1, fontSize: 11, color: t.theme.colors.textSecondary },
    adCta: { fontSize: 10, color: t.theme.colors.primary, fontWeight: '600' },
  }));

  const [streak, setStreak] = useState({ current: 0, longest: 0, total: 0, curfewRate: 0 });
  const loadData = useCallback(async () => { setStreak(await getStreak()); }, []);
  useEffect(() => { loadData(); }, [loadData]);

  const companionType = theme.companion.type;
  const stage = Math.min(Math.floor(streak.current / 3), 4);
  const names = companionStageNames[companionType] || stageDefault;

  return (
    <View style={s.container}>
      <ScrollView contentContainerStyle={s.scroll}>
        <T style={s.title}>🏆 成就</T>

        <View style={s.companionCard}>
          <T style={s.companionEmoji}>{companionEmoji(companionType, stage)}</T>
          <T style={s.companionLabel}>{names[stage]}</T>
          <View style={s.progressBar}>
            <View style={[s.progressFill, { width: `${Math.min((streak.current / (Math.max(stage, 1) * 3)) * 100, 100)}%` }]} />
          </View>
          <T style={s.progressLabel}>连续 {streak.current} / {Math.max(stage + 1, 1) * 3} 天</T>
        </View>

        <T style={s.sectionTitle}>徽章</T>
        <View style={s.badgeGrid}>
          {badges.map((b, i) => {
            const unlocked = streak.current >= b.min;
            return (
              <View key={i} style={[s.badgeItem, { opacity: unlocked ? 1 : 0.35 }]}>
                <T style={[s.badgeIcon, !unlocked && { opacity: 0.3 }]}>{b.icon}</T>
                <T style={s.badgeName}>{b.name}</T>
              </View>
            );
          })}
        </View>

        <View style={s.ad}>
          <T style={s.adBadge}>广告</T>
          <T style={{ fontSize: 14 }}>🎬</T>
          <T style={s.adText}>夜间助眠音乐·免费试听</T>
          <T style={s.adCta}>播放</T>
        </View>
      </ScrollView>
    </View>
  );
}
