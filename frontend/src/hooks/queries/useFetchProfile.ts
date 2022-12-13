import { AxiosError, AxiosResponse } from 'axios';

import useAuthQuery from '@hooks/useAuthQuery';
import { UserType } from '@typings/types';
import { clientAxios } from '@utils/commonAxios';

const getUserProfile = async (id: number) => {
  return clientAxios.get(`/v1/users/${id}`, {
    params: { id },
    withCredentials: true,
  });
};

interface ResponseType {
  status: string;
  message: string;
  data: UserType;
}

const useFetchProfile = (id: number) => {
  const { data, isLoading, isFetching } = useAuthQuery<
    AxiosResponse<ResponseType>,
    AxiosError,
    UserType
  >(['profile', id], () => getUserProfile(id), {
    select: (res) => res.data.data,
  });

  return { profile: data, isLoading, isFetching };
};

export default useFetchProfile;
