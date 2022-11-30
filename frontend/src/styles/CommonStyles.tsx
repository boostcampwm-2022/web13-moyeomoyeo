import { ReactNode } from 'react';

import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

import RouterTransition from '@components/common/RouterTransition';
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
    <RouterTransition />
    <NotificationsProvider>{children}</NotificationsProvider>
  </MantineProvider>
);

export default CommonStyles;
