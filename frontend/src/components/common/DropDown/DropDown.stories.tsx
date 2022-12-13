import { ComponentMeta, ComponentStory } from '@storybook/react';

import { CategoryKr } from '@constants/category';

import DropDown from '.';

export default {
  title: 'Component/DropDown',
  component: DropDown,
} as ComponentMeta<typeof DropDown>;

const Template: ComponentStory<typeof DropDown> = (args) => <DropDown {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: '카테고리',
  placeholder: '카테고리 선택하기',
  data: Object.entries(CategoryKr).map(([key, value]) => ({ label: value, value: key })),
  required: true,
};
