import ParticipateButton from '.';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ParticipateButtonStatus } from '@constants/participateButton';

export default {
  title: 'Component/ParticipateButton',
  component: ParticipateButton,
} as ComponentMeta<typeof ParticipateButton>;

const Template: ComponentStory<typeof ParticipateButton> = (args) => (
  <ParticipateButton {...args} />
);

export const Apply = Template.bind({});
Apply.args = {
  status: ParticipateButtonStatus.APPLY,
};

export const Cancel = Template.bind({});
Cancel.args = {
  status: ParticipateButtonStatus.CANCEL,
};

export const Closed = Template.bind({});
Closed.args = {
  status: ParticipateButtonStatus.CLOSED,
};

export const Link = Template.bind({});
Link.args = {
  status: ParticipateButtonStatus.LINK,
  chatRoomLink: 'test room link',
};
