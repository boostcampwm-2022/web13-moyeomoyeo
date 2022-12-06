import { MutationFunction } from '@tanstack/query-core';
import { useMutation } from '@tanstack/react-query';
import { UseMutationOptions } from '@tanstack/react-query/src/types';
import { AxiosError } from 'axios';

import AuthError from '@utils/errors/AuthError';
import RequestError from '@utils/errors/RequestError';

const useAuthMutation = <
  TData = unknown,
  TError = AxiosError,
  TVariables = unknown,
  TContext = unknown
>(
  mutationFunc: MutationFunction<TData, TVariables>,
  options?: Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'mutationFn'>
) => {
  const { error, ...rest } = useMutation<TData, TError, TVariables, TContext>(
    mutationFunc,
    options
  );

  if (error && error instanceof AxiosError) {
    if (error.response.status === 401) {
      throw new AuthError();
    }
    throw new RequestError(error.response.data.message);
  }

  return { ...rest };
};

export default useAuthMutation;
