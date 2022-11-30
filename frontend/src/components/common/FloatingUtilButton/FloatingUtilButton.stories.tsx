import { ComponentMeta, ComponentStory } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import Header from '@components/common/Header';
import DetailTitle from '@components/common/Header/DetailTitle';
import NavigationTab from '@components/common/NavigationTab';
import PageLayout from '@components/common/PageLayout';

import FloatingUtilButton from '.';

export default {
  title: 'Component/FloatingUtilButton',
  component: FloatingUtilButton,
  argTypes: {
    authorized: {
      description: '로그인 여부를 나타냅니다.',
      control: {
        type: 'boolean',
      },
    },
  },
} as ComponentMeta<typeof FloatingUtilButton>;

const SampleHeader = () => (
  <Header leftNode={<DetailTitle title="로그인" subTitle="로그인을 해주세요" />} />
);

const DefaultTemplate: ComponentStory<typeof FloatingUtilButton> = (args) => (
  <PageLayout header={<SampleHeader />} footer={<NavigationTab />}>
    <FloatingUtilButton />
  </PageLayout>
);

export const Default = DefaultTemplate.bind({});

export const Clicked = DefaultTemplate.bind({});

Clicked.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const buttons = await canvas.findAllByRole('button');
  userEvent.click(buttons[1]);
};
