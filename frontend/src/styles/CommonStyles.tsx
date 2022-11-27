import { ReactNode } from 'react';

import { MantineProvider } from '@mantine/core';

import CustomFonts from '@styles/CustomFont';
import GlobalStyles from '@styles/GlobalStyles';
import theme from '@styles/theme';

interface Props {
  children: ReactNode;
}

const CommonStyles = ({ children }: Props) => (
  <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
    <CustomFonts />
    <GlobalStyles />
    {children}
  </MantineProvider>
);

export default CommonStyles;
