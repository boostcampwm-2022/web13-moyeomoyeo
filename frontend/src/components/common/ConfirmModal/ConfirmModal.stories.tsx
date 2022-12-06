import { ComponentMeta, ComponentStory } from '@storybook/react';

import ConfirmModal from '.';

export default {
  title: 'Component/ConfirmModal',
  component: ConfirmModal,
} as ComponentMeta<typeof ConfirmModal>;

const Template: ComponentStory<typeof ConfirmModal> = (args) => <ConfirmModal {...args} />;

export const _ConfirmModal = Template.bind({});
_ConfirmModal.args = {
  open: true,
  message: '삭제하시겠습니까?',
  onConfirmButtonClick: () => {},
  onCancelButtonClick: () => {},
};
