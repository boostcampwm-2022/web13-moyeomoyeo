import { useRouter } from 'next/router';
import { useEffect } from 'react';

import useFetchMyInfo from '@hooks/queries/useFetchMyInfo';

const LoginRedirect = () => {
  const { data, isLoading } = useFetchMyInfo();

  const router = useRouter();

  useEffect(() => {
    const authRequiredPaths = ['/my', '/notification', '/article', '/user'];

    if (!isLoading && !data && authRequiredPaths.some((path) => router.pathname.includes(path))) {
      void router.push('/login');
    }
  }, [data, isLoading, router]);

  return <></>;
};

export default LoginRedirect;
