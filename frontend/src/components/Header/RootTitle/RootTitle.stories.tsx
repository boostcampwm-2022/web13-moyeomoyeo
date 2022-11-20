import RootTitle from '.';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Component/Header/HeaderItems/RootTitle',
  component: RootTitle,
} as ComponentMeta<typeof RootTitle>;

const Template: ComponentStory<typeof RootTitle> = (args) => <RootTitle {...args} />;
export const _RootTitle = Template.bind({});
_RootTitle.args = {
  title: '모임게시판',
  subTitle: '다양한 소모임을 위한 게시판',
};
