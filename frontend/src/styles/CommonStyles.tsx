import { ReactNode } from 'react';
import { MantineProvider } from '@mantine/core';
import theme from '@styles/theme';
import CustomFonts from '@styles/CustomFont';
import GlobalStyles from '@styles/GlobalStyles';

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
