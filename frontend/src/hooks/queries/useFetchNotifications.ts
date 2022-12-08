import { useMemo } from 'react';

import { AxiosError } from 'axios';

import useAuthInfiniteQuery from '@hooks/useAuthInfiniteQuery';
import { NotificationType } from '@typings/types';
import { clientAxios } from '@utils/commonAxios';

interface NotificationPagingData {
  totalPage: number;
  currentPage: number;
  countPerPage: number;
  data: NotificationType[];
}

interface NotificationResponseType {
  status: string;
  message: string;
  data: NotificationPagingData;
}

const getNotifications = async (currentPage: number) => {
  const {
    data: { data },
  } = await clientAxios.get<NotificationResponseType>('/v1/notifications', {
    params: { currentPage, countPerPage: 15 },
  });
  return data;
};

const useFetchNotifications = () => {
  const { data, ...queryResult } = useAuthInfiniteQuery<
    NotificationPagingData,
    AxiosError,
    NotificationPagingData
  >(['notifications'], ({ pageParam = 1 }) => getNotifications(pageParam), {
    getNextPageParam: (lastPage) =>
      lastPage.totalPage === lastPage.currentPage ? undefined : lastPage.currentPage + 1,
    refetchInterval: 3000,
  });

  const notifications = useMemo(() => (data ? data.pages.flatMap(({ data }) => data) : []), [data]);

  return { data: notifications, ...queryResult };
};

export default useFetchNotifications;
