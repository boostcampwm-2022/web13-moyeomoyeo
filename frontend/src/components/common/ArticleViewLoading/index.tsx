import styled from '@emotion/styled';
import { Skeleton, Space } from '@mantine/core';

const ArticleViewLoading = () => {
  return (
    <>
      <ArticleAuthor>
        <Skeleton height={56} circle />
        <div>
          <Skeleton height={20} width={300} mb={8} />
          <Skeleton height={14} width={20} />
        </div>
      </ArticleAuthor>
      <Space h="lg" />
      <Skeleton height={24} width={200} mb={16} />
      <ArticleStatusBar>
        <Skeleton height={24} width={60} />
        <Skeleton height={24} width={60} />
        <Skeleton height={24} width={60} />
      </ArticleStatusBar>
      <Space h="lg" />
      <ArticleApplicationStatus>
        <Skeleton height={16} width={100} mb={16} />
        <Skeleton height={16} width={100} mb={16} />
      </ArticleApplicationStatus>
      <Skeleton height={12} width="100%" mb={16} />
      <Skeleton height={200} width="100%" mb={16} />
      <Skeleton height={42} width="100%" mb={16} />
    </>
  );
};

const ArticleAuthor = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
`;

const ArticleStatusBar = styled.div`
  display: flex;
  gap: 0.4rem;
`;

const ArticleApplicationStatus = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default ArticleViewLoading;
