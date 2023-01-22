import { useMemo } from 'react';

import { AxiosError } from 'axios';

import useAuthInfiniteQuery from '@hooks/useAuthInfiniteQuery';
import useNotificationEvent from '@hooks/useNotificationEvent';
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
  const { data, refetch, ...queryResult } = useAuthInfiniteQuery<
    NotificationPagingData,
    AxiosError,
    NotificationPagingData
  >(['notifications'], ({ pageParam = 1 }) => getNotifications(pageParam), {
    getNextPageParam: (lastPage) =>
      lastPage.data.length === 0 ? undefined : lastPage.currentPage + 1,
  });

  const notifications = useMemo(
    () => (data ? data.pages.flatMap(({ data }) => data) : undefined),
    [data]
  );

  useNotificationEvent({
    onNotification: (e) => {
      void refetch();
    },
  });

  return { data: notifications, ...queryResult };
};

export default useFetchNotifications;
