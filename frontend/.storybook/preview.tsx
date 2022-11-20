import { ReactNode } from 'react';
import CommonStyles from '@styles/CommonStyles';

const ThemeWrapper = (props: { children: ReactNode }) => {
  return <CommonStyles>{props.children}</CommonStyles>;
};

export const decorators = [(renderStory: Function) => <ThemeWrapper>{renderStory()}</ThemeWrapper>];
