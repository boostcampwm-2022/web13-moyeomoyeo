import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { ApiResponse, UserType } from '@typings/types';
import { clientAxios } from '@utils/commonAxios';

/**
 * 로그인 한 유저의 유저정보를 반환
 */

const useFetchMyInfo = () => {
  const { data, isLoading, isError } = useQuery<ApiResponse<UserType>, AxiosError, UserType>(
    ['my'],
    () => clientAxios.get('/v1/my-info'),
    {
      select: (res) => res.data.data,
      retry: false,
      staleTime: 1000 * 60 * 4,
    }
  );

  return { data, isLoading, isError };
};

export default useFetchMyInfo;
