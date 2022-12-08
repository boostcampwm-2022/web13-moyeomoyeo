import { Skeleton } from '@mantine/core';

const ArticleListLoading = () => {
  return (
    <>
      {new Array(8).fill(0).map((_, index) => (
        <Skeleton height={307} key={index} />
      ))}
    </>
  );
};

export default ArticleListLoading;
