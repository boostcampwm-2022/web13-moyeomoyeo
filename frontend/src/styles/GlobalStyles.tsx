import { Global } from '@mantine/core';

const GlobalStyle = () => {
  return (
    <Global
      styles={{
        '*, *::before, *::after': {
          boxSizing: 'border-box',
          fontFamily: 'NanumSquareNeo, sans-serif',
        },
        html: {
          fontSize: '62.5%',
        },
      }}
    />
  );
};

export default GlobalStyle;
