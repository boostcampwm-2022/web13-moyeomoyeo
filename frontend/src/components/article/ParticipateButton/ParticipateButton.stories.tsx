import { ComponentMeta, ComponentStory } from '@storybook/react';
import ParticipateButton from '.';
import { ParticipateButtonStatus } from '@constants/participateButton';

export default {
  title: 'Component/ParticipateButton',
  component: ParticipateButton,
} as ComponentMeta<typeof ParticipateButton>;

const Template: ComponentStory<typeof ParticipateButton> = (args) => (
  <ParticipateButton {...args} />
);

export const ApplyButton = Template.bind({});
ApplyButton.args = {
  status: ParticipateButtonStatus.APPLY,
};

export const CancelButton = Template.bind({});
CancelButton.args = {
  status: ParticipateButtonStatus.CANCEL,
};

export const ClosedButton = Template.bind({});
ClosedButton.args = {
  status: ParticipateButtonStatus.CLOSED,
};

export const LinkButton = Template.bind({});
LinkButton.args = {
  status: ParticipateButtonStatus.LINK,
};
