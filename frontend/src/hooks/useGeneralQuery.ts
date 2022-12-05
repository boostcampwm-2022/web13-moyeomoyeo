import { QueryFunction, QueryKey, useQuery } from '@tanstack/react-query';
import { UseQueryOptions } from '@tanstack/react-query/src/types';
import { AxiosError } from 'axios';

import GetError from '@utils/errors/GetError';

const useGeneralQuery = <
  TQueryFnData = unknown,
  TError = AxiosError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    'queryKey' | 'queryFn' | 'initialData'
  > & { initialData?: () => undefined }
) => {
  const { data, isLoading, isFetching, error } = useQuery<TQueryFnData, TError, TData, TQueryKey>(
    queryKey,
    queryFn,
    options
  );

  if (error && error instanceof AxiosError) {
    if (error.response.status !== 401) {
      throw new GetError(error.response.data.message);
    }
  }

  return { data, isLoading, isFetching };
};

export default useGeneralQuery;
