import { ComponentMeta, ComponentStory } from '@storybook/react';
import EmptyMessage from '.';

export default {
  title: 'Component/EmptyMessage',
  component: EmptyMessage,
} as ComponentMeta<typeof EmptyMessage>;

const Template: ComponentStory<typeof EmptyMessage> = (args) => <EmptyMessage {...args} />;

export const _EmptyMessage = Template.bind({});
_EmptyMessage.args = {
  target: 'article',
  large: false,
};
