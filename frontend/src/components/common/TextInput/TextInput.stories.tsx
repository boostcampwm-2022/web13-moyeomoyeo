import { ComponentMeta, ComponentStory } from '@storybook/react';

import TextInput from '.';

export default {
  title: 'Component/TextInput',
  component: TextInput,
} as ComponentMeta<typeof TextInput>;

const Template: ComponentStory<typeof TextInput> = (args) => <TextInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: '제목',
  placeholder: '제목을 입력해주세요.',
  required: true,
};
