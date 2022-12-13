import { useEffect, useState } from 'react';

const useDeferredResponse = () => {
  const [isDeferred, setIsDeferred] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsDeferred(true);
    }, 200);
    return () => clearTimeout(timeout);
  }, []);

  return isDeferred;
};

export default useDeferredResponse;
