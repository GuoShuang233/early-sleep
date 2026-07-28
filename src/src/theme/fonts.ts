// Font mappings — uses bundled .ttf files for consistent cross-platform rendering
// Font files must be in android/app/src/main/assets/fonts/

export function resolveFont(key: string): string | undefined {
  const map: Record<string, string | undefined> = {
    'system': undefined,           // System default
    'rounded': undefined,          // Fallback to system (rounded not bundled)
    'serif': 'Noto Serif',         // NotoSerif.ttf
    'handwrite': undefined,        // Fallback to system
    'mono': 'JetBrains Mono',      // JetBrainsMono-Regular.ttf (monospace)
  };
  return map[key];
}

// Font size multipliers per density level
export function fontSizeScale(density: string): number {
  const map: Record<string, number> = {
    'comfortable': 1.0,  // Normal
    'compact': 0.9,      // Slightly smaller
    'minimal': 0.85,     // Even smaller
  };
  return map[density] || 1.0;
}
