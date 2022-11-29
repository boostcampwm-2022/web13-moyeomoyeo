import { useQuery } from '@tanstack/react-query';
import { UseQueryOptions } from '@tanstack/react-query/src/types';
import { AxiosError, AxiosResponse } from 'axios';

import AuthError from '../components/error/AuthError';

const useCustomQuery = <T>(
  queryKey: string[],
  fetchFunc: () => Promise<AxiosResponse<T>>,
  options?: Omit<
    UseQueryOptions<AxiosResponse<T>, AxiosError, T>,
    'initialData' | 'queryFn' | 'queryKey'
  > & { initialData?: () => undefined }
) => {
  const { data, isLoading, isFetching, error } = useQuery<AxiosResponse<T>, AxiosError, T>(
    queryKey,
    fetchFunc,
    options
  );

  if (error) {
    if (error.response && error.response.status === 401) {
      throw new AuthError();
    }
    throw error;
  }

  return { data, isLoading, isFetching };
};

export default useCustomQuery;
