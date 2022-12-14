import { ComponentMeta, ComponentStory } from '@storybook/react';

import LoginButton from '.';

export default {
  title: 'Component/Layout/Header/HeaderItems/LoginButton',
  component: LoginButton,
} as ComponentMeta<typeof LoginButton>;

const Template: ComponentStory<typeof LoginButton> = (args) => <LoginButton />;

export const _LoginButton = Template.bind({});
_LoginButton.args = {};
