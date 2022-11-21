import FloatingButton from '.';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

export default {
  title: 'Component/FloatingButton',
  component: FloatingButton,
} as ComponentMeta<typeof FloatingButton>;

const Template: ComponentStory<typeof FloatingButton> = (args) => <FloatingButton />;

export const Default = Template.bind({});

export const Clicked = Template.bind({});
Clicked.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const button = await canvas.findByRole('button');
  userEvent.click(button);
};
