import React from 'react';
import { Text as RNText, TextProps } from 'react-native';
import { useTheme } from './ThemeContext';
import { resolveFont } from './fonts';

// Themed Text component - applies the active font globally
export function T(props: TextProps & { children?: any }) {
  const { theme } = useTheme();
  const font = resolveFont(theme.font);
  return (
    <RNText {...props} style={[props.style, font ? { fontFamily: font } : null]}>
      {props.children}
    </RNText>
  );
}

// Convenience: bold, secondary, etc.
export function TTitle(props: any) { return <T {...props} style={[{ fontSize: 18, fontWeight: '700' }, props.style]} />; }
export function TLabel(props: any) { return <T {...props} style={[{ fontSize: 14, fontWeight: '500' }, props.style]} />; }
export function TMuted(props: any) { return <T {...props} style={[{ fontSize: 11, color: '#62666d' }, props.style]} />; }
