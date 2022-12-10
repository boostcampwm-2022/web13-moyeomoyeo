import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useSetRecoilState } from 'recoil';

import { scrollYAtom } from '@recoil/atoms';

const ScrollHandler = () => {
  const router = useRouter();
  const setScrollY = useSetRecoilState(scrollYAtom);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (url !== '/') {
        setScrollY(window.scrollY);
      }
    };
    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events, setScrollY]);

  return <></>;
};

export default ScrollHandler;
