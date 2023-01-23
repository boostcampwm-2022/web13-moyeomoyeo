import Link from 'next/link';

import { Menu, Text } from '@mantine/core';

import Avatar from '@components/common/Avatar';
import LoginButton from '@components/common/Header/LoginButton';
import useFetchMyInfo from '@hooks/queries/useFetchMyInfo';
import useLogout from '@hooks/queries/useLogout';
import { showToast } from '@utils/toast';

const UserLoginItem = () => {
  const { data: myData, isLoading } = useFetchMyInfo();
  const { mutate: logout } = useLogout();

  const handleClickLogoutItem = async () => {
    logout(
      {},
      {
        onSuccess: () => {
          showToast({ title: '로그아웃 완료!', message: '다음에도 꼭 이용해주세요!' });
        },
      }
    );
  };

  if (isLoading) return null;

  return myData ? (
    <Menu position="bottom-end">
      <Menu.Target>
        <Avatar
          size="md"
          alt={myData.userName}
          src={myData.profileImage}
          style={{ cursor: 'pointer' }}
          priority
        />
      </Menu.Target>
      <Menu.Dropdown>
        <Link href="/my">
          <Menu.Item p="md">
            <Text fz="md" fw={500}>
              내 프로필
            </Text>
          </Menu.Item>
        </Link>
        <Menu.Item p="md" onClick={handleClickLogoutItem}>
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
