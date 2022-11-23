import PageLayout from '@components/common/PageLayout';
import Header from '@components/common/Header';
import DetailTitle from '@components/common/Header/DetailTitle';

const WritePage = () => {
  return (
    <PageLayout>
      <Header leftNode={<DetailTitle title="모집게시판" subTitle="게시글을 작성해주세요." />} />
    </PageLayout>
  );
};

export default WritePage;
