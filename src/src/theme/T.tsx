import React from 'react';
import { Text as RNText, TextProps, StyleSheet } from 'react-native';
import { useTheme } from './ThemeContext';
import { resolveFont } from './fonts';

/**
 * Themed Text — applies theme font + density font size.
 * Uses StyleSheet.flatten to guarantee fontFamily takes effect.
 */
export function T(props: TextProps & { children?: any }) {
  const { theme } = useTheme();
  const font = resolveFont(theme.font);

  // Build a flat style object: base styles + font override
  const flatStyle: any = StyleSheet.flatten(props.style) || {};
  if (font) {
    flatStyle.fontFamily = font;
  }

  return (
    <RNText {...props} style={flatStyle}>
      {props.children}
    </RNText>
  );
}
