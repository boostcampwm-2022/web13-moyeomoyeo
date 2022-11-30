import Link from 'next/link';

import { Menu, Text } from '@mantine/core';
import { IconArrowAutofitUp, IconPencil } from '@tabler/icons';

import FloatingButton from '@components/common/FloatingButton';
import useFetchMyInfo from '@hooks/queries/useFetchMyInfo';

/**
 * FloatingButton과
 * FloatingButton을 눌렀을 때 나오는 Item들
 * Item 별로 필요한 로직들을 정의한다
 */

const FloatingUtilButton = () => {
  const { data: myData } = useFetchMyInfo();
  return (
    <FloatingButton>
      <Menu.Item
        p="md"
        icon={<IconArrowAutofitUp color="black" size={20} />}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <Text fz="md" fw={500}>
          상단으로 이동
        </Text>
      </Menu.Item>
      {myData && (
        <Link href="/article/write">
          <Menu.Item p="md" icon={<IconPencil color="black" size={20} />}>
            <Text fz="md" fw={500}>
              게시글 작성
            </Text>
          </Menu.Item>
        </Link>
      )}
    </FloatingButton>
  );
};

export default FloatingUtilButton;
