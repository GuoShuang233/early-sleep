import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import {
  ThemeConfig,
  presetThemes,
  PresetKey,
  darkPrecision,
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
}

const ThemeContext = createContext<ThemeContextType>(null!);

const STORAGE_KEY = '@earlysleep_theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentPreset, setCurrentPreset] = useState<PresetKey | 'custom'>('dark-precision');
  const [customOverrides, setCustomOverrides] = useState<Partial<ThemeConfig>>({});
  const [autoSwitch, setAutoSwitch] = useState(true);
  const [loaded, setLoaded] = useState(false);

  // Load saved theme (once on mount)
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
    AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ preset: currentPreset, custom: customOverrides, autoSwitch })
    ).catch(() => {});
  }, [currentPreset, customOverrides, autoSwitch, loaded]);

  // Auto-switch timer (once on mount, then every 30 min)
  // IMPORTANT: does NOT depend on currentPreset — won't fight manual switches
  useEffect(() => {
    if (!autoSwitch || !loaded) return;
    const applyAutoSwitch = () => {
      const h = new Date().getHours();
      const isDay = h >= 6 && h < 18;
      const target: PresetKey = isDay ? 'minimal-light' : 'dark-precision';
      setCurrentPreset((prev) => (prev === 'custom' ? prev : target));
    };
    applyAutoSwitch();
    const interval = setInterval(applyAutoSwitch, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [autoSwitch, loaded]); // ✓ no currentPreset dependency

  // Memoize theme so useThemedStyles can track identity
  const theme = useMemo(() => {
    const base = currentPreset === 'custom'
      ? darkPrecision
      : presetThemes[currentPreset as PresetKey];
    return { ...base, ...customOverrides };
  }, [currentPreset, customOverrides]);

  const hour = new Date().getHours();
  const isDark = hour < 6 || hour >= 18;

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDark,
        setPreset: (key) => {
          setCurrentPreset(key);
          setCustomOverrides({});
        },
        setCustom: (partial) => {
          setCurrentPreset('custom');
          setCustomOverrides((prev) => ({ ...prev, ...partial }));
        },
        currentPreset,
        autoSwitch,
        setAutoSwitch,
      }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
