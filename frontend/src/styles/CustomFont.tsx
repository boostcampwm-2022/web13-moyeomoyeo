import { Global } from '@mantine/core';

const CustomFonts = () => {
  return (
    <Global
      styles={[
        {
          '@font-face': {
            fontFamily: 'NanumSquareNeo',
            src: `url('/fonts/NanumSquareNeo-Light.woff2') format('woff2')`,
            fontWeight: 100,
          },
        },
        {
          '@font-face': {
            fontFamily: 'NanumSquareNeo',
            src: `url('/fonts/NanumSquareNeo-Regular.woff2') format('woff2')`,
            fontWeight: 300,
          },
        },
        {
          '@font-face': {
            fontFamily: 'NanumSquareNeo',
            src: `url('/fonts/NanumSquareNeo-Bold.woff2') format('woff2')`,
            fontWeight: 500,
          },
        },
        {
          '@font-face': {
            fontFamily: 'NanumSquareNeo',
            src: `url('/fonts/NanumSquareNeo-ExtraBold.woff2') format('woff2')`,
            fontWeight: 700,
          },
        },
        {
          '@font-face': {
            fontFamily: 'NanumSquareNeo',
            src: `url('/fonts/NanumSquareNeo-Heavy.woff2') format('woff2')`,
            fontWeight: 900,
          },
        },
      ]}
    />
  );
};

export default CustomFonts;
