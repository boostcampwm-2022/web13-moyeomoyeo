import { AxiosError } from 'axios';

import useGeneralQuery from '@hooks/useGeneralQuery';
import { ApiResponse, UserType } from '@typings/types';
import { clientAxios } from '@utils/commonAxios';

/**
 * 로그인 한 유저의 유저정보를 반환
 */

const useFetchMyInfo = () => {
  const { data, isLoading } = useGeneralQuery<ApiResponse<UserType>, AxiosError, UserType>(
    ['my'],
    () => clientAxios.get('/v1/my-info'),
    {
      select: (res) => res.data.data,
      retry: false,
      staleTime: 1000 * 60 * 4,
    }
  );

  return { data, isLoading };
};

export default useFetchMyInfo;
