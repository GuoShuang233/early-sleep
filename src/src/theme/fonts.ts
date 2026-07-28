// Font mappings
// On Android, 'serif' and 'monospace' are guaranteed system fonts
// Custom TTF fonts in assets/fonts/ may need native registration

export function resolveFont(key: string): string | undefined {
  const map: Record<string, string | undefined> = {
    'system': undefined,       // System default (no fontFamily)
    'rounded': undefined,     // Not available
    'serif': 'serif',         // Built-in Android serif font (guaranteed)
    'handwrite': undefined,   // Not available
    'mono': 'monospace',      // Built-in Android monospace font (guaranteed)
  };
  return map[key];
}

export function fontSizeScale(density: string): number {
  return { 'comfortable': 1.0, 'compact': 0.85, 'minimal': 0.75 }[density] || 1.0;
}
