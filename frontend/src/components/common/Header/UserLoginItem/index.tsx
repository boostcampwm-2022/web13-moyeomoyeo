import LoginButton from '@components/common/Header/LoginButton';
import { Avatar } from '@mantine/core';

/**
 * 로그인 여부를 확인하여
 * 아바타를 렌더링하거나 로그인 버튼을 렌더링
 */

const UserLoginItem = ({ authorized = false }: { authorized?: boolean }) => {
  /**
   * TODO
   * query로 user 정보를 가져와서 로그인했는지 안했는지를 확인한다.
   * query를 추가하면 props로 로그인 여부를 받는 건 제거한다.
   */
  return authorized ? (
    <Avatar
      radius="xl"
      size="md"
      alt="avatar"
      src="https://avatars.githubusercontent.com/u/90585081?v=4"
    />
  ) : (
    <LoginButton />
  );
};

export default UserLoginItem;
