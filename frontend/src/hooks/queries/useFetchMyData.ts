import getTestMyData from '@apis/test/getTestMyData';
import useGeneralQuery from '@hooks/useGeneralQuery';
import { UserType } from '@typings/types';

const useFetchMyData = () => {
  const { data, isLoading } = useGeneralQuery<UserType>(['myinfo'], getTestMyData, {
    select: (data) => data.data,
  });

  return { data, isLoading };
};

export default useFetchMyData;
