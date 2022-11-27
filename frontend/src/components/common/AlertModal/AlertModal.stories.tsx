import { ComponentMeta, ComponentStory } from '@storybook/react';

import AlertModal from '.';

export default {
  title: 'Component/AlertModal',
  component: AlertModal,
} as ComponentMeta<typeof AlertModal>;

const Template: ComponentStory<typeof AlertModal> = (args) => <AlertModal {...args} />;

export const _AlertModal = Template.bind({});
_AlertModal.args = {
  open: true,
  onClose: () => {},
  message: '테스트 문구입니다',
};
