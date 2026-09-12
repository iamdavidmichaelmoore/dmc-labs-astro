export const lightTheme = {
  bg: '#F7F1E8',
  ink: '#1C1915',
  surface: '#EFE7DB',
  accent: '#C45C26',
} as const;

export const darkTheme = {
  bg: '#141210',
  ink: '#F3EDE4',
  surface: '#1E1B17',
  accent: '#D96A32',
} as const;

export type ThemePalette = typeof lightTheme | typeof darkTheme;

/** Map a palette onto the four core CSS custom properties ThemeInit injects. */
export function themeToCssVars(theme: ThemePalette): Record<string, string> {
  return {
    '--bg-color': theme.bg,
    '--text-primary': theme.ink,
    '--surface': theme.surface,
    '--accent': theme.accent,
  };
}
