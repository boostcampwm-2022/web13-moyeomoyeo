import Link from 'next/link';

import { Menu, Text } from '@mantine/core';

import Avatar from '@components/common/Avatar';
import LoginButton from '@components/common/Header/LoginButton';
import useFetchMyInfo from '@hooks/queries/useFetchMyInfo';

/**
 * TODO
 * 로그아웃 API 연동하기
 */

const UserLoginItem = () => {
  const { data: myData, isLoading } = useFetchMyInfo();

  if (isLoading) return null;

  return myData ? (
    <Menu position="bottom-end" transition="rotate-right" transitionDuration={200}>
      <Menu.Target>
        <Avatar size="md" alt={myData.userName} src={myData.profileImage} />
      </Menu.Target>
      <Menu.Dropdown>
        <Link href="/my">
          <Menu.Item p="md">
            <Text fz="md" fw={500}>
              내 프로필
            </Text>
          </Menu.Item>
        </Link>
        <Menu.Item p="md">
          <Text fz="md" fw={500}>
            로그아웃
          </Text>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  ) : (
    <LoginButton />
  );
};

export default UserLoginItem;
