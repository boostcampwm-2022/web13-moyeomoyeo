import { ComponentMeta, ComponentStory } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { Chip, Menu, Text } from '@mantine/core';
import { IconArrowAutofitUp, IconPencil } from '@tabler/icons';

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

const FloatingItemChildren = () => (
  <>
    <Menu.Item p="md" icon={<IconArrowAutofitUp color="black" size={20} />}>
      <Text fz="md" fw={500}>
        상단으로 이동
      </Text>
    </Menu.Item>
    <Menu.Item p="md" icon={<IconPencil color="black" size={20} />}>
      <Text fz="md" fw={500}>
        게시글 작성
      </Text>
    </Menu.Item>
  </>
);

const DefaultTemplate: ComponentStory<typeof FloatingButton> = (args) => (
  <PageLayout header={<SampleHeader />} footer>
    <FloatingButton {...args} data-testid="floating" />
  </PageLayout>
);

const OverflowTemplate: ComponentStory<typeof FloatingButton> = (args) => (
  <PageLayout header={<SampleHeader />} footer>
    {Array.from({ length: 100 })
      .fill(0)
      .map((_, i) => (
        <Chip defaultChecked key={i}>
          Awesome chip
        </Chip>
      ))}
    <FloatingButton {...args} />
  </PageLayout>
);

export const Default = DefaultTemplate.bind({});
Default.args = {
  children: <FloatingItemChildren />,
};

export const Clicked = DefaultTemplate.bind({});
Clicked.args = {
  children: <FloatingItemChildren />,
};
Clicked.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const buttons = await canvas.findAllByRole('button');
  userEvent.click(buttons[1]);
};

export const InOverflowPage = OverflowTemplate.bind({});
InOverflowPage.args = {
  children: <FloatingItemChildren />,
};
InOverflowPage.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const buttons = await canvas.findAllByRole('button');
  userEvent.click(buttons[1]);
};
