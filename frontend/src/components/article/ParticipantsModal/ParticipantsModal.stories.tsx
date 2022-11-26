import { ComponentMeta, ComponentStory } from '@storybook/react';

import { dummyParticipants } from '@constants/dummy';

import ParticipantsModal from '.';

export default {
  title: 'Component/ParticipantsModal',
  component: ParticipantsModal,
} as ComponentMeta<typeof ParticipantsModal>;

const Template: ComponentStory<typeof ParticipantsModal> = (args) => (
  <ParticipantsModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  participants: dummyParticipants,
  open: true,
};

export const NoParticipants = Template.bind({});
NoParticipants.args = {
  participants: [],
  open: true,
};
