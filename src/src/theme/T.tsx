import React from 'react';
import { Text as RNText, TextProps, StyleSheet } from 'react-native';
import { useTheme } from './ThemeContext';
import { resolveFont, fontSizeScale } from './fonts';

export function T(props: TextProps & { children?: any }) {
  const { theme } = useTheme();
  const font = resolveFont(theme.font);
  const scale = fontSizeScale(theme.density);
  
  // Build style: base props style + font override
  const baseStyle = props.style;
  const fontOverride: any = {};
  if (font) fontOverride.fontFamily = font;

  return (
    <RNText {...props} style={[baseStyle, fontOverride]}>
      {props.children}
    </RNText>
  );
}
