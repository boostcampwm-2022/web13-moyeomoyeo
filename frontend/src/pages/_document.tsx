import Document, { Head, Html, Main, NextScript } from 'next/document';

import { createGetInitialProps } from '@mantine/next';

import FaviconConfig from '@components/common/FaviconConfig';
import HeadMeta from '@components/common/HeadMeta';

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html lang="ko">
        <Head>
          <HeadMeta />
          <FaviconConfig />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
