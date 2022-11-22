import { ComponentMeta, ComponentStory } from '@storybook/react';
import StatCounter from '.';

export default {
  title: 'Component/StatCounter',
  component: StatCounter,
} as ComponentMeta<typeof StatCounter>;

const Template: ComponentStory<typeof StatCounter> = (args) => <StatCounter {...args} />;

export const Like = Template.bind({});
Like.args = {
  variant: 'like',
  count: 100,
};

export const Comment = Template.bind({});
Comment.args = {
  variant: 'comment',
  count: 80,
};

export const Scrap = Template.bind({});
Scrap.args = {
  variant: 'scrap',
  count: 75,
};
