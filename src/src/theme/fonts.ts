// Font mappings — uses bundled .ttf files
// On Android, fontFamily must match the filename without extension

export function resolveFont(key: string): string | undefined {
  const map: Record<string, string | undefined> = {
    'system': undefined,
    'rounded': undefined,
    'serif': 'NotoSerif',              // NotoSerif.ttf
    'handwrite': undefined,
    'mono': 'JetBrainsMono-Regular',   // JetBrainsMono-Regular.ttf
  };
  return map[key];
}

export function fontSizeScale(density: string): number {
  return { 'comfortable': 1.0, 'compact': 0.85, 'minimal': 0.75 }[density] || 1.0;
}
