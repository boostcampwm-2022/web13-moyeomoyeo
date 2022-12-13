import { ComponentMeta, ComponentStory } from '@storybook/react';

import GitLoginButton from '.';

export default {
  title: 'Component/GitLoginButton',
  component: GitLoginButton,
} as ComponentMeta<typeof GitLoginButton>;

const Template: ComponentStory<typeof GitLoginButton> = () => <GitLoginButton />;

export const _GitLoginButton = Template.bind({});
