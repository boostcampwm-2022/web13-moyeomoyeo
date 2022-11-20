import Logo from '.';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Component/Logo',
  component: Logo,
} as ComponentMeta<typeof Logo>;

const Template: ComponentStory<typeof Logo> = (args) => <Logo />;

export const _Logo = Template.bind({});
