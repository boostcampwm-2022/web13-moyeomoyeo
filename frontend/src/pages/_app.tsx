import Head from 'next/head';
import { AppProps } from 'next/app';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import RouterTransition from '@components/RouterTransition';
import CommonStyles from '@styles/CommonStyles';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
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
