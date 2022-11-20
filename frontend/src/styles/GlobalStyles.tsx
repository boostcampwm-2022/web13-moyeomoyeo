import { Global } from '@mantine/core';

const globalStyle = () => {
  return (
    <Global
      styles={{
        '*, *::before, *::after': {
          boxSizing: 'border-box',
        },
        html: {
          fontSize: '62.5%',
        },
      }}
    />
  );
};

export default globalStyle;
