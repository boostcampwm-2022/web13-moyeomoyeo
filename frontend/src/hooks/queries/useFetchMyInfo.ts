import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

import { ApiResponse, UserType } from '@typings/types';

/**
 * 로그인 시 유저정보를 반환하며
 * redirect = true 인 경우 로그인 페이지로 리다이렉션 처리
 */

const useFetchMyInfo = (redirect = false) => {
  const router = useRouter();
  const { data, isLoading, isError } = useQuery<ApiResponse<UserType>, AxiosError, UserType>(
    ['my'],
    () => axios.get('/api/v1/my-info'),
    {
      select: (res) => res.data.data,
      retry: false,
      staleTime: 1000 * 60 * 4,
    }
  );

  useEffect(() => {
    if (redirect && !isLoading && !data) {
      alert('로그인이 필요합니다.');
      void router.push('/login');
    }
  }, [redirect, data, isLoading]);

  return { data, isLoading, isError };
};

export default useFetchMyInfo;
