import { ReactNode } from 'react';

import { ActionIcon, Menu } from '@mantine/core';
import { IconDotsVertical } from '@tabler/icons';

interface Props {
  /**
   * Menu.Items로 감싸진 컴포넌트들을 넣어줍니다.
   * 필요한 이벤트들은 Menu.Items에 바인딩하여 넘겨주어야 합니다.
   * Menu.Item의 p는 md로 고정되도록 해야 디자인 시안에 맞습니다.
   * 예시는 스토리북의 Header/DetailFull을 참고하세요.
   */
  children: ReactNode;
}

const UtilButton = ({ children }: Props) => {
  return (
    <Menu position="bottom-end">
      <Menu.Target>
        <ActionIcon variant="transparent" color="dark">
          <IconDotsVertical size={24} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>{children}</Menu.Dropdown>
    </Menu>
  );
};

export default UtilButton;
