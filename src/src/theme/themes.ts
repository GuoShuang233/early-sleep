// 主题类型定义 & 4 套预设主题
// 完整 8 维度的主题自定义体系

export interface ThemeConfig {
  name: string;
  colors: {
    background: string;
    surface: string;
    surfaceBorder: string;
    primary: string;
    text: string;
    textSecondary: string;
    success: string;
    warning: string;
    error: string;
  };
  radii: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  button: {
    style: 'rounded' | 'pill' | 'sharp' | 'pet' | 'glow' | 'outline' | '3d';
    petType?: 'cat' | 'bear' | 'owl' | 'star';
  };
  companion: {
    type: 'plant' | 'flower' | 'cactus' | 'cat' | 'owl' | 'ocean' | 'star';
    currentStage: number;
  };
  background: {
    type: 'color' | 'gradient' | 'photo' | 'animated' | 'texture';
    photoPath?: string;
    blur?: number;
    overlay?: number;
  };
  sound: {
    bedtime?: string;
    wakeup?: string;
    feedback?: string;
  };
  font: 'system' | 'rounded' | 'serif' | 'handwrite' | 'mono';
  density: 'comfortable' | 'compact' | 'minimal';
  animation: 'smooth' | 'reduced' | 'playful' | 'none';
}

// 预设 A: Dark Precision
export const darkPrecision: ThemeConfig = {
  name: 'Dark Precision',
  colors: {
    background: '#08090a',
    surface: 'rgba(255,255,255,0.02)',
    surfaceBorder: 'rgba(255,255,255,0.06)',
    primary: '#7170ff',
    text: '#f7f8f8',
    textSecondary: '#8a8f98',
    success: '#10b981',
    warning: '#fbbf24',
    error: '#f87171',
  },
  radii: { sm: 8, md: 12, lg: 14, xl: 16 },
  button: { style: 'rounded' },
  companion: { type: 'plant', currentStage: 0 },
  background: { type: 'color' },
  sound: { bedtime: 'rain', wakeup: 'birds', feedback: 'chord' },
  font: 'system',
  density: 'comfortable',
  animation: 'smooth',
};

// 预设 B: Warm Night
export const warmNight: ThemeConfig = {
  name: 'Warm Night',
  colors: {
    background: '#120c1a',
    surface: 'rgba(200,180,230,0.04)',
    surfaceBorder: 'rgba(200,180,230,0.08)',
    primary: '#b8a0e0',
    text: '#f0ece4',
    textSecondary: '#8a7a9a',
    success: '#88c8e8',
    warning: '#f0b888',
    error: '#d08070',
  },
  radii: { sm: 10, md: 14, lg: 18, xl: 20 },
  button: { style: 'rounded' },
  companion: { type: 'plant', currentStage: 0 },
  background: { type: 'gradient' },
  sound: { bedtime: 'ocean', wakeup: 'meditation', feedback: 'chord' },
  font: 'system',
  density: 'comfortable',
  animation: 'smooth',
};

// 预设 C: Nature Calm
export const natureCalm: ThemeConfig = {
  name: 'Nature Calm',
  colors: {
    background: '#0c140e',
    surface: 'rgba(80,180,100,0.04)',
    surfaceBorder: 'rgba(80,180,100,0.08)',
    primary: '#80d890',
    text: '#e0efe0',
    textSecondary: '#6a8a6a',
    success: '#80d890',
    warning: '#d0b870',
    error: '#d08070',
  },
  radii: { sm: 8, md: 12, lg: 16, xl: 18 },
  button: { style: 'rounded' },
  companion: { type: 'flower', currentStage: 0 },
  background: { type: 'gradient' },
  sound: { bedtime: 'forest', wakeup: 'birds', feedback: 'chord' },
  font: 'system',
  density: 'comfortable',
  animation: 'smooth',
};

// 预设 D: Minimal Light
export const minimalLight: ThemeConfig = {
  name: 'Minimal Light',
  colors: {
    background: '#ffffff',
    surface: '#faf9f7',
    surfaceBorder: '#eeece8',
    primary: '#6c5ce7',
    text: '#2c2c2c',
    textSecondary: '#9a9a9a',
    success: '#00b894',
    warning: '#e17055',
    error: '#d63031',
  },
  radii: { sm: 8, md: 12, lg: 14, xl: 16 },
  button: { style: 'rounded' },
  companion: { type: 'plant', currentStage: 0 },
  background: { type: 'color' },
  sound: { bedtime: 'piano', wakeup: 'gentle', feedback: 'ding' },
  font: 'system',
  density: 'comfortable',
  animation: 'smooth',
};

export const presetThemes = {
  'dark-precision': darkPrecision,
  'warm-night': warmNight,
  'nature-calm': natureCalm,
  'minimal-light': minimalLight,
};

export type PresetKey = keyof typeof presetThemes;
