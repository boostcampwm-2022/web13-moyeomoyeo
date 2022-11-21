import Header from '.';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Logo from '@components/Logo';
import { Avatar, Menu, Text } from '@mantine/core';
import LoginButton from '@components/Header/LoginButton';
import RootTitle from '@components/Header/RootTitle';
import DetailTitle from '@components/Header/DetailTitle';
import UtilButton from '@components/Header/UtilButton';

export default {
  title: 'Component/Header',
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const HomeRootNotLogin = Template.bind({});
HomeRootNotLogin.args = {
  leftNode: <Logo />,
  rightNode: <LoginButton />,
};

HomeRootNotLogin.parameters = {
  nextRouter: {
    path: '/login',
    asPath: '/',
  },
};

export const HomeRootLogin = Template.bind({});
HomeRootLogin.args = {
  leftNode: <Logo />,
  rightNode: (
    <Avatar
      radius="xl"
      size="md"
      alt="avatar"
      src="https://avatars.githubusercontent.com/u/90585081?v=4"
    />
  ),
};

export const OtherRootLogin = Template.bind({});
OtherRootLogin.args = {
  leftNode: <RootTitle title="모임게시판" subTitle="다양한 소모임을 위한 게시판" />,
  rightNode: (
    <Avatar
      radius="xl"
      size="md"
      alt="avatar"
      src="https://avatars.githubusercontent.com/u/90585081?v=4"
    />
  ),
};

export const OtherRootNotLogin = Template.bind({});
OtherRootNotLogin.args = {
  leftNode: <RootTitle title="모임게시판" subTitle="다양한 소모임을 위한 게시판" />,
  rightNode: <LoginButton />,
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
