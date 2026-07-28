import React from 'react';
import { Text as RNText, TextProps } from 'react-native';
import { useTheme } from './ThemeContext';
import { resolveFont, fontSizeScale } from './fonts';

// Themed Text component — applies active font + density-based scaling
export function T(props: TextProps & { children?: any }) {
  const { theme } = useTheme();
  const font = resolveFont(theme.font);
  const scale = fontSizeScale(theme.density);
  const fontStyle: any = font ? { fontFamily: font } : {};
  return (
    <RNText {...props}
      allowFontScaling={false}
      style={[props.style, fontStyle, scale !== 1 ? { fontSize: (props.style as any)?.fontSize ? (props.style as any).fontSize * scale : undefined } : null]}>
      {props.children}
    </RNText>
  );
}
