import { ReactNode } from 'react';

import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

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
    <NotificationsProvider>{children}</NotificationsProvider>
  </MantineProvider>
);

export default CommonStyles;
