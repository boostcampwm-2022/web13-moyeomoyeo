import { ComponentMeta, ComponentStory } from '@storybook/react';

import { dummyUser } from '@constants/dummy';

import Profile from '.';

export default {
  title: 'Component/Profile ',
  component: Profile,
} as ComponentMeta<typeof Profile>;

const Template: ComponentStory<typeof Profile> = (args) => <Profile {...args} />;

export const _Profile = Template.bind({});
_Profile.args = {
  ...dummyUser,
};
