import { useRouter } from 'next/router';

import {
  QueryFunction,
  QueryKey,
  UseInfiniteQueryOptions,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import AuthError from '@utils/errors/AuthError';
import GetError from '@utils/errors/GetError';

const useAuthInfiniteQuery = <
  TQueryFnData = unknown,
  TError = AxiosError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: Omit<
    UseInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>,
    'queryKey' | 'queryFn'
  >
) => {
  const { isReady } = useRouter();
  const { error, ...rest } = useInfiniteQuery<TQueryFnData, TError, TData, TQueryKey>(
    queryKey,
    queryFn,
    { ...options, enabled: isReady && options.enabled }
  );
  if (error && error instanceof AxiosError) {
    if (error.response.status === 401) {
      throw new AuthError();
    }
    throw new GetError(error.response.data.message);
  }
  return { ...rest };
};

export default useAuthInfiniteQuery;
