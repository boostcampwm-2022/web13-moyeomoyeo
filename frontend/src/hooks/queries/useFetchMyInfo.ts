import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

import { ApiResponse, UserType } from '@typings/types';

const useFetchMyInfo = () => {
  const { data, isLoading } = useQuery<ApiResponse<UserType>, AxiosError, UserType>(
    ['my'],
    () => axios.get('/api/v1/my-info'),
    {
      select: (res) => res.data.data,
      retry: 0,
      staleTime: 1000 * 60 * 5,
    }
  );
  return { data, isLoading };
};

export default useFetchMyInfo;
