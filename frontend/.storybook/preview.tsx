import { ReactNode } from 'react';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import CommonStyles from '@styles/CommonStyles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const ThemeWrapper = (props: { children: ReactNode }) => {
  return <CommonStyles>{props.children}</CommonStyles>;
};

export const parameters = {
  layout: 'fullscreen',
  nextRouter: {
    Provider: RouterContext.Provider,
  },
};

const queryClient = new QueryClient();

export const decorators = [
  (renderStory: Function) => (
    <QueryClientProvider client={queryClient}>
      <ThemeWrapper>{renderStory()}</ThemeWrapper>
    </QueryClientProvider>
  ),
];
