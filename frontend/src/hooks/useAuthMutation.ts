import { MutationFunction } from '@tanstack/query-core';
import { useMutation } from '@tanstack/react-query';
import { UseMutationOptions } from '@tanstack/react-query/src/types';
import { AxiosError } from 'axios';

import AuthError from '@components/common/ErrorBoundary/AuthError';

const useAuthMutation = <
  TData = unknown,
  TError = AxiosError,
  TVariables = unknown,
  TContext = unknown
>(
  mutationFunc: MutationFunction<TData, TVariables>,
  options?: Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'mutationFn'>
) => {
  const { mutate, error } = useMutation<TData, TError, TVariables, TContext>(mutationFunc, options);

  if (error && error instanceof AxiosError) {
    if (error.response && error.response.status === 401) {
      throw new AuthError();
    }
    throw error;
  }

  return { mutate };
};

export default useAuthMutation;
