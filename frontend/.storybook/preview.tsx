import { ReactNode } from 'react';
import { MantineProvider } from '@mantine/core';
import theme from '../src/styles/theme';

const ThemeWrapper = (props: { children: ReactNode }) => {
  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      {props.children}
    </MantineProvider>
  );
};

export const decorators = [(renderStory: Function) => <ThemeWrapper>{renderStory()}</ThemeWrapper>];
