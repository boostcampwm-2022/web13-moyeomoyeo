import { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { uuid } from 'uuidv4';

import RouterTransition from '@components/common/RouterTransition';
import ApiErrorBoundary from '@components/error/ApiErrorBoundary';
import AuthErrorBoundary from '@components/error/AuthErrorBoundary';
import ErrorBoundary from '@components/error/ErrorBoundary';
import initMockApi from '@mocks/.';
import CommonStyles from '@styles/CommonStyles';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
      retry: false,
    },
  },
});

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
        <title>모여모여 - 개발자 소모임 커뮤니티</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <CommonStyles>
          <ErrorBoundary key={uuid()}>
            <AuthErrorBoundary>
              <ApiErrorBoundary>
                <RouterTransition />
                <Component {...pageProps} />
              </ApiErrorBoundary>
            </AuthErrorBoundary>
          </ErrorBoundary>
        </CommonStyles>
      </QueryClientProvider>
    </>
  );
}
