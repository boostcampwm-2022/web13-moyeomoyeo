import Head from 'next/head';
import { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import theme from '@styles/theme';
import CustomFonts from '@styles/CustomFont';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Page title</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
        <CustomFonts />
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}
