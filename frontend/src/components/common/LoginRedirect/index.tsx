import { useRouter } from 'next/router';
import { useEffect } from 'react';

import useFetchMyInfo from '@hooks/queries/useFetchMyInfo';

const LoginRedirect = () => {
  const { data, isLoading } = useFetchMyInfo();

  const router = useRouter();

  useEffect(() => {
    const noRedirectPaths = ['/', '/login'];
    if (!isLoading && !data && !noRedirectPaths.includes(router.pathname)) {
      void router.push('/login');
    }
  }, [data, isLoading, router]);

  return <></>;
};

export default LoginRedirect;
