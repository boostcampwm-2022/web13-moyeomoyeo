import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Menu, Text } from '@mantine/core';

import Header from '@components/common/Header';
import DetailTitle from '@components/common/Header/DetailTitle';
import RootTitle from '@components/common/Header/RootTitle';
import UserLoginItem from '@components/common/Header/UserLoginItem';
import UtilButton from '@components/common/Header/UtilButton';
import NavigationTab from '@components/common/NavigationTab';

import PageLayout from '.';

export default {
  title: 'Component/Layout/PageLayout',
  component: PageLayout,
} as ComponentMeta<typeof PageLayout>;

const Template: ComponentStory<typeof PageLayout> = (args) => <PageLayout {...args} />;

export const RootPageLayout = Template.bind({});
RootPageLayout.args = {
  footer: <NavigationTab />,
  hasFloatingUtil: true,
  header: (
    <Header
      leftNode={<RootTitle title="페이지 대제목" subTitle="페이지 소제목" />}
      rightNode={<UserLoginItem />}
    />
  ),
};

export const DetailPageLayout = Template.bind({});
DetailPageLayout.args = {
  footer: <NavigationTab />,
  hasFloatingUtil: false,
  header: (
    <Header
      leftNode={<DetailTitle title="페이지 대제목" subTitle="페이지 소제목" />}
      rightNode={
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
      }
    />
  ),
};

export const PageLayoutInOverflow = Template.bind({});
PageLayoutInOverflow.args = {
  footer: <NavigationTab />,
  hasFloatingUtil: true,
  header: (
    <Header
      leftNode={<DetailTitle title="페이지 대제목" subTitle="페이지 소제목" />}
      rightNode={
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
      }
    />
  ),
  children: (
    <>
      <div
        style={{ width: '300px', height: '300px', backgroundColor: 'red', marginBottom: '10px' }}
      ></div>
      <div
        style={{ width: '300px', height: '300px', backgroundColor: 'red', marginBottom: '10px' }}
      ></div>
      <div
        style={{ width: '300px', height: '300px', backgroundColor: 'red', marginBottom: '10px' }}
      ></div>
      <div
        style={{ width: '300px', height: '300px', backgroundColor: 'red', marginBottom: '10px' }}
      ></div>
      <div
        style={{ width: '300px', height: '300px', backgroundColor: 'red', marginBottom: '10px' }}
      ></div>
    </>
  ),
};
