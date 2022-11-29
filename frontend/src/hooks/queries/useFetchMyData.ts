import { useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

import getTestMyData from '@apis/test/getTestMyData';
import { UserType } from '@typings/types';

const useFetchMyData = () => {
  const { data, isLoading } = useQuery<AxiosResponse<UserType>, AxiosError, UserType>(
    ['myinfo'],
    getTestMyData,
    {
      select: (data) => data.data,
    }
  );

  return { data, isLoading };
};

export default useFetchMyData;
