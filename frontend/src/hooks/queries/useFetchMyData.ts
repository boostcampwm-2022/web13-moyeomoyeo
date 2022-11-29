import getTestMyData from '@apis/test/getTestMyData';
import { UserType } from '@typings/types';

import useCustomQuery from '../useCustomQuery';

const useFetchMyData = () => {
  const { data, isLoading } = useCustomQuery<UserType>(['myinfo'], getTestMyData, {
    select: (data) => data.data,
  });

  return { data, isLoading };
};

export default useFetchMyData;
