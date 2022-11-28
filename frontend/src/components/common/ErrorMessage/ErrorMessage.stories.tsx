import { ComponentMeta, ComponentStory } from '@storybook/react';

import ErrorMessage from '.';

export default {
  title: 'Component/ErrorMessage',
  component: ErrorMessage,
} as ComponentMeta<typeof ErrorMessage>;

const Template: ComponentStory<typeof ErrorMessage> = (args) => <ErrorMessage {...args} />;

export const _404 = Template.bind({});
_404.args = {
  errorCode: 404,
  title: '저희의 빈틈을 찾으셨군요',
  description: '여기는 그저 빈 페이지 입니다.',
  subDescription: '홈 페이지로 돌려보내드릴게요.',
};

export const _500 = Template.bind({});
_500.args = {
  errorCode: 500,
  title: '에러가 발생했어요',
  description: '저희가 뭘 잘못 만들었나봐요.',
  subDescription: '금방 해결해드릴게요.',
};
