import { ReactNode, useState } from 'react';

import { Menu } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';

import { FABWrapper, StyledIconPlus } from './styles';

/**
 * FloatingButton의 자체의 UI 로직만 정의한 컴포넌트
 */

interface Props {
  /**
   * 플로팅 버튼을 눌렀을 때 나오는 요소들을 넣는다.
   */
  children?: ReactNode;
}

const FloatingButton = ({ children }: Props) => {
  const [opened, setOpened] = useState(false);
  const ref = useClickOutside(() => setOpened(false));

  return (
    <Menu position="top-end" transition="rotate-right" transitionDuration={200}>
      <Menu.Target>
        <FABWrapper
          color="indigo"
          variant="filled"
          radius="xl"
          size={48}
          onClick={() => setOpened((o) => !o)}
          ref={ref}
        >
          <StyledIconPlus size={24} $opened={opened} />
        </FABWrapper>
      </Menu.Target>
      <Menu.Dropdown>{children}</Menu.Dropdown>
    </Menu>
  );
};

export default FloatingButton;
