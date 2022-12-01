import { useCallback, useState } from 'react';

import { AxiosError } from 'axios';

const useAsyncError = () => {
  const [, setError] = useState();
  return useCallback(
    (msg: string) => {
      setError(() => {
        throw new AxiosError(msg);
      });
    },
    [setError]
  );
};

export default useAsyncError;
