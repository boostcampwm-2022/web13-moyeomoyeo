import { ComponentMeta, ComponentStory } from '@storybook/react';

import { dummyParticipants } from '@constants/dummy';

import ParticipantItem from '.';

export default {
  title: 'Component/ParticipantItem',
  component: ParticipantItem,
} as ComponentMeta<typeof ParticipantItem>;

const Template: ComponentStory<typeof ParticipantItem> = (args) => <ParticipantItem {...args} />;

export const _ParticipantItem = Template.bind({});
_ParticipantItem.args = {
  participant: dummyParticipants[0],
};
