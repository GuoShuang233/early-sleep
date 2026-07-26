// Font mappings for cross-platform fontFamily values
// Android supports: serif, monospace, sans-serif, sans-serif-light, sans-serif-medium, sans-serif-rounded
// iOS supports all system fonts

export const FONT_MAP: Record<string, string | undefined> = {
  system: undefined,
  rounded: 'sans-serif-rounded',
  serif: 'serif',
  handwrite: 'serif',      // Android has no native cursive; fallback
  mono: 'monospace',
};

export function resolveFont(key: string): string | undefined {
  return FONT_MAP[key] || undefined;
}

export const FONT_SIZE_MAP = {
  small: 13,
  medium: 15,
  large: 18,
};
