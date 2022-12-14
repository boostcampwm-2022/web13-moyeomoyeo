import { ComponentMeta, ComponentStory } from '@storybook/react';

import DetailTitle from '.';

export default {
  title: 'Component/Layout/Header/HeaderItems/DetailTitle',
  component: DetailTitle,
} as ComponentMeta<typeof DetailTitle>;

const Template: ComponentStory<typeof DetailTitle> = (args) => <DetailTitle {...args} />;

export const _DetailTitle = Template.bind({});
_DetailTitle.args = {
  title: '모임게시판',
  subTitle: '다양한 소모임을 위한 게시판',
};
