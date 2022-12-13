import { Skeleton } from '@mantine/core';

import useDeferredResponse from '@hooks/useDeferredResponse';

const NotificationLoading = () => {
  const isDeferred = useDeferredResponse();

  if (!isDeferred) {
    return <></>;
  }

  return (
    <>
      {new Array(10).fill(0).map((_, index) => (
        <Skeleton height={73} key={index} />
      ))}
    </>
  );
};

export default NotificationLoading;
