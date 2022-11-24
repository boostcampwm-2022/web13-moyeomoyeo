import { Menu, Text } from '@mantine/core';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';

import Header from '.';
import UserLoginItem from '@components/common/Header/UserLoginItem';
import Logo from '@public/icons/logo-md.svg';
import RootTitle from '@components/common/Header/RootTitle';
import DetailTitle from '@components/common/Header/DetailTitle';
import UtilButton from '@components/common/Header/UtilButton';

export default {
  title: 'Component/Layout/Header',
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const HomeRootNotLogin = Template.bind({});
HomeRootNotLogin.args = {
  leftNode: <Logo />,
  rightNode: <UserLoginItem />,
};

export const HomeRootLogin = Template.bind({});
HomeRootLogin.args = {
  leftNode: <Logo />,
  rightNode: <UserLoginItem authorized />,
};

export const OtherRootLogin = Template.bind({});
OtherRootLogin.args = {
  leftNode: <RootTitle title="모임게시판" subTitle="다양한 소모임을 위한 게시판" />,
  rightNode: <UserLoginItem authorized />,
};

export const OtherRootNotLogin = Template.bind({});
OtherRootNotLogin.args = {
  leftNode: <RootTitle title="모임게시판" subTitle="다양한 소모임을 위한 게시판" />,
  rightNode: <UserLoginItem />,
};

export const DetailPlain = Template.bind({});
DetailPlain.args = {
  leftNode: <DetailTitle title="모임게시판" subTitle="다양한 소모임을 위한 게시판" />,
};

export const DetailFull = Template.bind({});
DetailFull.args = {
  leftNode: <DetailTitle title="모임게시판" subTitle="다양한 소모임을 위한 게시판" />,
  rightNode: (
    <UtilButton>
      <Menu.Item p="md">
        <Text fz="md" fw={500}>
          로그아웃
        </Text>
      </Menu.Item>
      <Menu.Item p="md">
        <Text fz="md" fw={500}>
          이름이 엄청 긴거
        </Text>
      </Menu.Item>
    </UtilButton>
  ),
};

export const DetailFullClicked = Template.bind({});
DetailFullClicked.args = {
  leftNode: <DetailTitle title="모임게시판" subTitle="다양한 소모임을 위한 게시판" />,
  rightNode: (
    <UtilButton>
      <Menu.Item p="md" data-testid="item">
        <Text fz="md" fw={500}>
          로그아웃
        </Text>
      </Menu.Item>
      <Menu.Item p="md" data-testid="item">
        <Text fz="md" fw={500}>
          클릭이 잘 되나용?
        </Text>
      </Menu.Item>
    </UtilButton>
  ),
};
DetailFullClicked.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const clickedUtilButton = await canvas.findAllByRole('button');
  await userEvent.click(clickedUtilButton[1]);
};
