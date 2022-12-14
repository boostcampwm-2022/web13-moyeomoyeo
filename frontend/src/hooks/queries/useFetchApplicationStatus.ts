import { AxiosError } from 'axios';

import useAuthQuery from '@hooks/useAuthQuery';
import { ApiResponse } from '@typings/types';
import { clientAxios } from '@utils/commonAxios';

interface DataType {
  isJoined: boolean;
}

const useFetchApplicationStatus = (groupArticleId: number) => {
  const { data } = useAuthQuery<ApiResponse<DataType>, AxiosError, boolean>(
    ['applicationStatus', groupArticleId],
    () => clientAxios.get(`/v1/group-applications/status`, { params: { groupArticleId } }),
    {
      select: (res) => res.data.data.isJoined,
    }
  );

  return { data };
};

export default useFetchApplicationStatus;
