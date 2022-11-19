import { ReactNode } from 'react';
import { MantineProvider } from '@mantine/core';
import theme from '../src/styles/theme';
import GlobalStyles from '@styles/GlobalStyles';
import CustomFonts from '@styles/CustomFont';

const ThemeWrapper = (props: { children: ReactNode }) => {
  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      {props.children}
      <CustomFonts />
      <GlobalStyles />
    </MantineProvider>
  );
};

export const decorators = [(renderStory: Function) => <ThemeWrapper>{renderStory()}</ThemeWrapper>];
