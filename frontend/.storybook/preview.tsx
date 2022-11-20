import { ReactNode } from 'react';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import CommonStyles from '@styles/CommonStyles';

const ThemeWrapper = (props: { children: ReactNode }) => {
  return <CommonStyles>{props.children}</CommonStyles>;
};

export const parameters = {
  layout: 'fullscreen',
  nextRouter: {
    Provider: RouterContext.Provider,
  },
};

export const decorators = [(renderStory: Function) => <ThemeWrapper>{renderStory()}</ThemeWrapper>];
