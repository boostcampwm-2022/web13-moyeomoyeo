import Comment from '.';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Component/Comment',
  component: Comment,
} as ComponentMeta<typeof Comment>;

const Template: ComponentStory<typeof Comment> = (args) => <Comment {...args} />;

export const Default = Template.bind({});
