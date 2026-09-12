import { describe, expect, it } from 'vitest';
import { darkTheme, lightTheme } from '../../src/styles/themeTokens';

describe('themeTokens', () => {
  it('exposes the approved light and dark palettes', () => {
    expect(lightTheme).toEqual({
      bg: '#F7F1E8',
      ink: '#1C1915',
      surface: '#EFE7DB',
      accent: '#C45C26',
    });
    expect(darkTheme).toEqual({
      bg: '#141210',
      ink: '#F3EDE4',
      surface: '#1E1B17',
      accent: '#D96A32',
    });
  });
});
