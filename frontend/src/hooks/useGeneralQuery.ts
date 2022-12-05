import { useRouter } from 'next/router';

import { QueryFunction, QueryKey, useQuery } from '@tanstack/react-query';
import { UseQueryOptions } from '@tanstack/react-query/src/types';
import { AxiosError } from 'axios';

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
  const { isReady } = useRouter();
  const { data, isLoading, isFetching, error } = useQuery<TQueryFnData, TError, TData, TQueryKey>(
    queryKey,
    queryFn,
    { ...options, enabled: isReady && options.enabled }
  );

  if (error && error instanceof AxiosError) {
    if (error.response.status !== 401) {
      throw error;
    }
  }

  return { data, isLoading, isFetching };
};

export default useGeneralQuery;
