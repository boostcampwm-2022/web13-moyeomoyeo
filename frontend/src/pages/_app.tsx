import { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import '@styles/global.css';

import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { v4 as uuid } from 'uuid';

import BrowserCheck from '@components/common/BrowserCheck';
import ApiErrorBoundary from '@components/common/ErrorBoundary/ApiErrorBoundary';
import AuthErrorBoundary from '@components/common/ErrorBoundary/AuthErrorBoundary';
import ErrorBoundary from '@components/common/ErrorBoundary/ErrorBoundary';
import LoginRedirect from '@components/common/LoginRedirect';
import RouterTransition from '@components/common/RouterTransition';
import initMockApi from '@mocks/.';
import CommonStyles from '@styles/CommonStyles';

const isDevelopment = process.env.NODE_ENV === 'development';

export default function App({ Component, pageProps }: AppProps<{ dehydratedState: unknown }>) {
  const [shouldRender, setShouldRender] = useState<boolean>(!isDevelopment);
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
      })
  );

  useEffect(() => {
    if (isDevelopment) {
      void (async () => {
        await initMockApi();
        setShouldRender(true);
      })();
    }
  }, []);

  if (!shouldRender) return null;

  return (
    <>
      <Head>
        <title>모여모여 - 개발자 소모임 커뮤니티</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ReactQueryDevtools initialIsOpen={false} />
          <CommonStyles>
            <RouterTransition />
            <Background />
            <ErrorBoundary key={uuid()}>
              <AuthErrorBoundary>
                <ApiErrorBoundary>
                  <LoginRedirect />
                  <BrowserCheck />
                  <Component {...pageProps} />
                </ApiErrorBoundary>
              </AuthErrorBoundary>
            </ErrorBoundary>
            <Background />
          </CommonStyles>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

const Background = () => {
  return (
    <div
      style={{
        background: 'white',
        width: 'calc((100vw - 600px) / 2)',
      }}
    />
  );
};
