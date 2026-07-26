import React from 'react';
import { Text as RNText, TextProps } from 'react-native';
import { useTheme } from './ThemeContext';
import { resolveFont } from './fonts';

// Themed Text component - applies the active font globally
// Uses fontFamily as a hard override to ensure it actually takes effect
export function T(props: TextProps & { children?: any }) {
  const { theme } = useTheme();
  const font = resolveFont(theme.font);
  const fontStyle = font ? { fontFamily: font } : {};
  return (
    <RNText {...props} style={[props.style, fontStyle]}>
      {props.children}
    </RNText>
  );
}
