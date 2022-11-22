import FloatingButton from '.';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import PageLayout from '@components/common/PageLayout';
import { Chip } from '@mantine/core';

export default {
  title: 'Component/FloatingButton',
  component: FloatingButton,
  argTypes: {
    authorized: {
      name: 'authorized',
      control: {
        type: 'boolean',
      },
    },
  },
} as ComponentMeta<typeof FloatingButton>;

const DefaultTemplate: ComponentStory<typeof FloatingButton> = (args) => (
  <PageLayout footer data-testid="page">
    <FloatingButton {...args} />
  </PageLayout>
);

const OverflowTemplate: ComponentStory<typeof FloatingButton> = (args) => (
  <PageLayout footer>
    <div style={{ width: '100%', height: '100%' }} data-testid="page">
      {Array.from({ length: 100 })
        .fill(0)
        .map((_, i) => (
          <Chip defaultChecked key={i}>
            Awesome chip
          </Chip>
        ))}
    </div>
    <FloatingButton {...args} />
  </PageLayout>
);

export const Default = DefaultTemplate.bind({});
Default.args = {
  authorized: false,
};

export const Clicked = DefaultTemplate.bind({});
Clicked.args = {
  authorized: true,
};
Clicked.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const button = await canvas.findByRole('button');
  userEvent.click(button);
};

export const InOverflowPage = OverflowTemplate.bind({});
InOverflowPage.args = {
  authorized: true,
};
InOverflowPage.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const button = await canvas.findByRole('button');
  userEvent.click(button);
};
