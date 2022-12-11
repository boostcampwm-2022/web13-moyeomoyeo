import Head from 'next/head';

import { NextSeo } from 'next-seo';

interface Props {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
}

const HeadMeta = ({ title, description, url, image }: Props) => {
  return (
    <>
      <NextSeo
        title={title || '모여모여'}
        description={description || '개발자들을 위한 소모임 활성화 커뮤니티'}
        canonical={url || 'https://www.moyeomoyeo.com'}
        openGraph={{
          type: 'website',
          locale: 'ko_KR',
          url: url || 'https://www.moyeomoyeo.com',
          title: title || '모여모여',
          images: [
            {
              url: 'https://www.moyeomoyeo.com/default.jpg',
              width: 578,
              height: 309,
              alt: 'Moyeomoyeo Opengraph Image Alt',
            },
          ],
        }}
      />
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
    </>
  );
};

export default HeadMeta;
