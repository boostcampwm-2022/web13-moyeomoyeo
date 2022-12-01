import axios, { AxiosError, AxiosResponse } from 'axios';

import useAuthQuery from '@hooks/useAuthQuery';
import { UserType } from '@typings/types';

const getUserProfile = async (id: number) => {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/users/${id}`, {
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
  >(['article', id], () => getUserProfile(id), {
    select: (res) => res.data.data,
  });

  return { profile: data, isLoading, isFetching };
};

export default useFetchProfile;
