import { MantineThemeOverride } from '@mantine/core';

const theme: MantineThemeOverride = {
  colorScheme: 'light',
  focusRing: 'auto',
  defaultRadius: 'sm',
  primaryColor: 'indigo',
  defaultGradient: {
    from: 'indigo',
    to: 'cyan',
    deg: 45,
  },
  loader: 'oval',
  cursorType: 'pointer',
  fontFamily: 'NanumSquareNeo, sans-serif',
  lineHeight: 1.2,
  fontSizes: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 20,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
  },

  headings: {
    fontFamily: 'NanumSquareNeo, sans-serif',
    fontWeight: 900,
    sizes: {
      h1: { fontSize: 32, lineHeight: 1.2 },
      h2: { fontSize: 24, lineHeight: 1.2 },
      h3: { fontSize: 20, lineHeight: 1.2 },
      h4: { fontSize: 16, lineHeight: 1.2 },
      h5: { fontSize: 14, lineHeight: 1.2 },
      h6: { fontSize: 12, lineHeight: 1.2 },
    },
  },
};

export default theme;
