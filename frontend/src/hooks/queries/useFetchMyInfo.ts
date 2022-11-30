import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

import { ApiResponse, UserType } from '@typings/types';

/**
 * 로그인 한 유저의 유저정보를 반환
 */

const useFetchMyInfo = () => {
  const { data, isLoading, isError } = useQuery<ApiResponse<UserType>, AxiosError, UserType>(
    ['my'],
    () =>
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/my-info`, {
        withCredentials: true,
      }),
    {
      select: (res) => res.data.data,
      retry: false,
      staleTime: 1000 * 60 * 4,
    }
  );

  return { data, isLoading, isError };
};

export default useFetchMyInfo;
