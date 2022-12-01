import { AxiosError } from 'axios';

import useAuthQuery from '@hooks/useAuthQuery';
import { ApiResponse } from '@typings/types';
import { clientAxios } from '@utils/commonAxios';

const useFetchApplicationStatus = (groupArticleId: number) => {
  const { data, isLoading } = useAuthQuery<ApiResponse<{ isJoined: boolean }>, AxiosError, boolean>(
    ['applicationStatus', groupArticleId],
    () => clientAxios.get(`/v1/group-applications/status/${groupArticleId}`),
    {
      select: (res) => res.data.data.isJoined,
    }
  );

  return { data, isLoading };
};

export default useFetchApplicationStatus;
