import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  ThemeConfig,
  presetThemes,
  PresetKey,
  darkPrecision,
  minimalLight,
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

const ThemeContext = createContext<ThemeContextType>({
  theme: darkPrecision,
  isDark: true,
  setPreset: () => {},
  setCustom: () => {},
  currentPreset: 'dark-precision',
  autoSwitch: true,
  setAutoSwitch: () => {},
});

const STORAGE_KEY = '@earlysleep_theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentPreset, setCurrentPreset] = useState<PresetKey | 'custom'>('dark-precision');
  const [customOverrides, setCustomOverrides] = useState<Partial<ThemeConfig>>({});
  const [autoSwitch, setAutoSwitch] = useState(true);

  // Hour-based auto-switch: 6-18 = Minimal Light, 18-6 = Dark Precision
  useEffect(() => {
    if (!autoSwitch) return;
    const hour = new Date().getHours();
    const isDay = hour >= 6 && hour < 18;
    const targetPreset: PresetKey = isDay ? 'minimal-light' : 'dark-precision';
    if (currentPreset !== targetPreset && currentPreset === 'custom') {
      // Don't override manual custom
    } else if (currentPreset !== targetPreset) {
      setCurrentPreset(targetPreset);
    }
    // Re-check every 30 min
    const interval = setInterval(() => {
      const h = new Date().getHours();
      const day = h >= 6 && h < 18;
      const t: PresetKey = day ? 'minimal-light' : 'dark-precision';
      setCurrentPreset((prev) => (prev === 'custom' ? prev : t));
    }, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [autoSwitch, currentPreset]);

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
    })();
  }, []);

  // Save theme on change
  useEffect(() => {
    AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        preset: currentPreset,
        custom: customOverrides,
        autoSwitch,
      })
    ).catch(() => {});
  }, [currentPreset, customOverrides, autoSwitch]);

  // Build effective theme
  const baseTheme =
    currentPreset === 'custom'
      ? { ...darkPrecision, ...customOverrides }
      : { ...presetThemes[currentPreset as PresetKey], ...customOverrides };

  const hour = new Date().getHours();
  const isDark = hour < 6 || hour >= 18;

  return (
    <ThemeContext.Provider
      value={{
        theme: baseTheme,
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
