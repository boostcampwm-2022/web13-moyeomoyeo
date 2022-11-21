import { Global } from '@mantine/core';

const GlobalStyles = () => {
  return <Global styles={{ '*': { fontSize: '10px', boxSizing: 'border-box' } }} />;
};

export default GlobalStyles;
