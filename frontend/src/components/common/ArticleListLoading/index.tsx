import { Skeleton } from '@mantine/core';

import useDeferredResponse from '@hooks/useDeferredResponse';

const ArticleListLoading = () => {
  const isDeferred = useDeferredResponse();

  if (!isDeferred) {
    return <></>;
  }

  return (
    <>
      {new Array(8).fill(0).map((_, index) => (
        <Skeleton height={307} key={index} />
      ))}
    </>
  );
};

export default ArticleListLoading;
