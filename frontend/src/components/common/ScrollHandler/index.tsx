import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useRecoilState } from 'recoil';

import { scrollYAtom } from '@recoil/atoms';

const ScrollHandler = () => {
  const router = useRouter();
  const [scrollY, setScrollY] = useRecoilState(scrollYAtom);

  useEffect(() => {
    const saveScrollY = (url: string) => {
      if (url.startsWith('/article')) {
        setScrollY(window.scrollY);
      }
    };

    const restoreScrollY = (url: string) => {
      if (url === '/') {
        window.scrollTo({ top: scrollY });
        setScrollY(0);
      }
    };

    router.events.on('routeChangeStart', saveScrollY);
    router.events.on('routeChangeComplete', restoreScrollY);
    return () => {
      router.events.off('routeChangeStart', saveScrollY);
      router.events.off('routeChangeComplete', restoreScrollY);
    };
  }, [router.events, scrollY, setScrollY]);

  return <></>;
};

export default ScrollHandler;
