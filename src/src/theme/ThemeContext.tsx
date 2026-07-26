import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { I18nManager, Platform, NativeModules } from 'react-native';
import {
  ThemeConfig, presetThemes, PresetKey, darkPrecision,
} from './themes';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ThemeContextType {
  theme: ThemeConfig;
  isDark: boolean;
  setPreset: (key: PresetKey) => void;
  setCustom: (partial: Partial<ThemeConfig>) => void;
  currentPreset: PresetKey | 'custom';
  autoSwitch: boolean;
  setAutoSwitch: (v: boolean) => void;
  resetBackground: () => void;
}

const ThemeContext = createContext<ThemeContextType>(null!);
const STORAGE_KEY = '@earlysleep_theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentPreset, setCurrentPreset] = useState<PresetKey | 'custom'>('dark-precision');
  const [customOverrides, setCustomOverrides] = useState<Partial<ThemeConfig>>({});
  const [autoSwitch, setAutoSwitch] = useState(true);
  const [loaded, setLoaded] = useState(false);

  // Load saved theme
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          setCurrentPreset(parsed.preset || 'dark-precision');
          if (parsed.custom) setCustomOverrides(parsed.custom);
          if (parsed.autoSwitch !== undefined) setAutoSwitch(parsed.autoSwitch);
        }
      } catch {}
      setLoaded(true);
    })();
  }, []);

  // Save theme on change
  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({
      preset: currentPreset, custom: customOverrides, autoSwitch,
    })).catch(() => {});
  }, [currentPreset, customOverrides, autoSwitch, loaded]);

  // Auto-switch timer (does NOT depend on currentPreset)
  useEffect(() => {
    if (!autoSwitch || !loaded) return;
    const apply = () => {
      const h = new Date().getHours();
      const t: PresetKey = (h >= 6 && h < 18) ? 'minimal-light' : 'dark-precision';
      setCurrentPreset((prev) => (prev === 'custom' ? prev : t));
    };
    apply();
    const interval = setInterval(apply, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [autoSwitch, loaded]);

  // Memoize theme
  const theme = useMemo(() => {
    const base = currentPreset === 'custom' ? darkPrecision : presetThemes[currentPreset as PresetKey];
    return { ...base, ...customOverrides };
  }, [currentPreset, customOverrides]);

  // isDark from theme background
  const bg = theme.colors.background;
  const isDark = !bg.startsWith('#f') && !bg.startsWith('#e') && !bg.startsWith('#d');

  // Preserve background override when switching presets
  const setPresetWithBg = (key: PresetKey) => {
    const bgOverride = customOverrides.background ? { background: customOverrides.background } : {};
    setCurrentPreset(key);
    setCustomOverrides(bgOverride as Partial<ThemeConfig>);
  };

  const resetBackground = () => {
    setCustomOverrides((prev) => {
      const { background, ...rest } = prev;
      return rest;
    });
  };

  return (
    <ThemeContext.Provider
      value={{
        theme, isDark,
        setPreset: setPresetWithBg,
        setCustom: (partial) => {
          setCustomOverrides((prev) => ({ ...prev, ...partial }));
        },
        currentPreset, autoSwitch, setAutoSwitch, resetBackground,
      }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
