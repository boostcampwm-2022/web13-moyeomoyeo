import UtilButton from '.';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Menu, Text } from '@mantine/core';

export default {
  title: 'Component/Header/HeaderItems/UtilButton',
  component: UtilButton,
} as ComponentMeta<typeof UtilButton>;

const Template: ComponentStory<typeof UtilButton> = (args) => (
  <UtilButton>
    <Menu.Item p="md">
      <Text fz="md" fw={500}>
        로그아웃
      </Text>
    </Menu.Item>
    <Menu.Item p="md">
      <Text fz="md" fw={500}>
        이름이 엄청엄청 긴거
      </Text>
    </Menu.Item>
  </UtilButton>
);
export const _UtilButton = Template.bind({});
