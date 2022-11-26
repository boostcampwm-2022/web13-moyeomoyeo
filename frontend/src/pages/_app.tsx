import { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import RouterTransition from '@components/common/RouterTransition';
import initMockApi from '@mocks/.';
import CommonStyles from '@styles/CommonStyles';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const [shouldRender, setShouldRender] = useState<boolean>(false);

  useEffect(() => {
    void (async () => {
      // TODO development일때만 실행
      await initMockApi();
      setShouldRender(true);
    })();
  }, []);

  if (!shouldRender) return null;

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <CommonStyles>
          <RouterTransition />
          <Component {...pageProps} />
        </CommonStyles>
      </QueryClientProvider>
    </>
  );
}
