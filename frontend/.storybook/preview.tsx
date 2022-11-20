import { ReactNode } from 'react';
import CommonStyles from '@styles/CommonStyles';

const ThemeWrapper = (props: { children: ReactNode }) => {
  return <CommonStyles>{props.children}</CommonStyles>;
};

export const parameters = { layout: 'fullscreen' };

export const decorators = [(renderStory: Function) => <ThemeWrapper>{renderStory()}</ThemeWrapper>];
