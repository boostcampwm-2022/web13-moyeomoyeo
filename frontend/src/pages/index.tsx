import PageLayout from '@components/common/PageLayout';
import FloatingButton from '@components/FloatingButton';
import Header from '@components/Header';
import DetailTitle from '@components/Header/DetailTitle';

import { Menu, Text, Chip } from '@mantine/core';
import { IconArrowAutofitUp, IconPencil } from '@tabler/icons';

const FloatingItemChildren = () => (
  <>
    <Menu.Item p="md" icon={<IconArrowAutofitUp color="black" size={20} />}>
      <Text fz="md" fw={500}>
        상단으로 이동
      </Text>
    </Menu.Item>
    <Menu.Item p="md" icon={<IconPencil color="black" size={20} />}>
      <Text fz="md" fw={500}>
        게시글 작성
      </Text>
    </Menu.Item>
  </>
);

const Main = () => {
  return (
    <PageLayout
      header={
        <Header
          leftNode={<DetailTitle title="모임게시판" subTitle="다양한 소모임을 위한 게시판" />}
        />
      }
      footer
    >
      {Array.from({ length: 100 })
        .fill(0)
        .map((_, i) => (
          <Chip defaultChecked key={i}>
            Awesome chip
          </Chip>
        ))}
      <FloatingButton>
        <FloatingItemChildren />
      </FloatingButton>
    </PageLayout>
  );
};

export default Main;
