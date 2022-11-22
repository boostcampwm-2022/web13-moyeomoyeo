import PageLayout from '@components/common/PageLayout';
import { useEffect } from 'react';
import axios from 'axios';

const Main = () => {
  // const response = await axios({
  //   method: 'get',
  //   url: '/test',
  //   responseType: 'json',
  // });

  // console.log(response);
  useEffect(() => {
    (async () => {
      try {
        const response = await axios({
          method: 'get',
          url: '/test',
          responseType: 'json',
        });
        console.log(response, 'ttewe');
      } catch (e: any) {
        console.log(e);
      }
    })();
  }, []);

  return <PageLayout footer>my page</PageLayout>;
};

export default Main;
