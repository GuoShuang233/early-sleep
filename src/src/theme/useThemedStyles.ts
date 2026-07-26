import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

/**
 * Hook that creates a StyleSheet based on the current theme.
 * Styles automatically update when the theme changes.
 */
export function useThemedStyles<T extends Record<string, any>>(
  factory: (ctx: ReturnType<typeof useTheme>) => T,
): T {
  const ctx = useTheme();
  // Use theme's identity (memoized reference) to detect changes
  return useMemo(() => {
    const raw = factory(ctx);
    const styles = StyleSheet.create(raw);
    return styles as unknown as T;
  }, [ctx.theme, ctx.isDark]);
}
