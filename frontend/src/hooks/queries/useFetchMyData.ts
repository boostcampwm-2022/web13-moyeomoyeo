import getTestMyData from '@apis/test/getTestMyData';
import useAuthQuery from '@hooks/useAuthQuery';

const useFetchMyData = () => {
  const { data, isLoading } = useAuthQuery(['myinfo'], getTestMyData, {
    select: (data) => data.data,
  });

  return { data, isLoading };
};

export default useFetchMyData;
