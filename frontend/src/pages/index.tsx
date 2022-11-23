import PageLayout from '@components/common/PageLayout';
import Header from '@components/common/Header';
import DetailTitle from '@components/common/Header/DetailTitle';

import { Chip } from '@mantine/core';

const Main = () => {
  return (
    <PageLayout
      header={
        <Header
          leftNode={<DetailTitle title="모임게시판" subTitle="다양한 소모임을 위한 게시판" />}
        />
      }
      footer
      floatingUtil
    >
      {Array.from({ length: 100 })
        .fill(0)
        .map((_, i) => (
          <Chip defaultChecked key={i}>
            Awesome chip
          </Chip>
        ))}
    </PageLayout>
  );
};

export default Main;
