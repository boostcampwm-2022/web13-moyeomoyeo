import { useCallback, useState } from 'react';

import RequestError from '@utils/errors/RequestError';

const useAsyncError = () => {
  const [, setError] = useState();
  return useCallback(
    (msg: string) => {
      setError(() => {
        throw new RequestError(msg);
      });
    },
    [setError]
  );
};

export default useAsyncError;
