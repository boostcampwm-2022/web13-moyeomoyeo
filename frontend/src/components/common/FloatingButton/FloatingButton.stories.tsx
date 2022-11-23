import { ComponentMeta, ComponentStory } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import FloatingButton from '.';
import PageLayout from '@components/common/PageLayout';
import Header from '@components/common/Header';
import DetailTitle from '@components/common/Header/DetailTitle';

export default {
  title: 'Component/FloatingButton',
  component: FloatingButton,
} as ComponentMeta<typeof FloatingButton>;

const SampleHeader = () => (
  <Header leftNode={<DetailTitle title="로그인" subTitle="로그인을 해주세요" />} />
);

const DefaultTemplate: ComponentStory<typeof FloatingButton> = (args) => (
  <PageLayout header={<SampleHeader />} hasFooter>
    <FloatingButton {...args} />
  </PageLayout>
);

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Clicked = DefaultTemplate.bind({});
Clicked.args = {};
Clicked.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const buttons = await canvas.findAllByRole('button');
  userEvent.click(buttons[1]);
};
