import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export function useThemedStyles<T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>>(
  factory: (theme: ReturnType<typeof useTheme>) => T,
): T {
  const themeCtx = useTheme();
  return useMemo(() => {
    const raw = factory(themeCtx);
    return StyleSheet.create(raw) as T;
  }, [themeCtx.theme, themeCtx.isDark]);
}
