import { useState } from 'react';
import { IconArrowAutofitUp, IconPencil, IconPlus } from '@tabler/icons';
import { Menu, Text } from '@mantine/core';

import { FABWrapper } from './styles';

interface Props {
  /**
   * 유저가 로그인 되었는지 여부를 넘겨줍니다.
   */
  authorized?: boolean;
}

const FloatingButton = ({ authorized = false }: Props) => {
  const [opened, setOpened] = useState(false);

  return (
    <Menu position="top-end" transition="rotate-right" transitionDuration={200}>
      <Menu.Target>
        <FABWrapper
          color="indigo"
          variant="filled"
          radius="xl"
          size={48}
          onClick={() => setOpened((o) => !o)}
          opened={opened}
        >
          <IconPlus size={24} />
        </FABWrapper>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item p="md" icon={<IconArrowAutofitUp color="black" size={20} />}>
          <Text fz="md" fw={500}>
            상단으로 이동
          </Text>
        </Menu.Item>
        {authorized && (
          <Menu.Item p="md" icon={<IconPencil color="black" size={20} />}>
            <Text fz="md" fw={500}>
              게시글 작성
            </Text>
          </Menu.Item>
        )}
      </Menu.Dropdown>
    </Menu>
  );
};

export default FloatingButton;
