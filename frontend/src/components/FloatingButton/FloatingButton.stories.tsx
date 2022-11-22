import FloatingButton from '.';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import PageLayout from '@components/common/PageLayout';
import { Chip, Menu, Text } from '@mantine/core';
import { IconArrowAutofitUp, IconPencil } from '@tabler/icons';

export default {
  title: 'Component/FloatingButton',
  component: FloatingButton,
} as ComponentMeta<typeof FloatingButton>;

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
  <PageLayout footer>
    <FloatingButton {...args} />
  </PageLayout>
);

const OverflowTemplate: ComponentStory<typeof FloatingButton> = (args) => (
  <PageLayout footer>
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
  const button = await canvas.findByRole('button');
  userEvent.click(button);
};

export const InOverflowPage = OverflowTemplate.bind({});
InOverflowPage.args = {
  children: <FloatingItemChildren />,
};
InOverflowPage.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const button = await canvas.findByRole('button');
  userEvent.click(button);
};
