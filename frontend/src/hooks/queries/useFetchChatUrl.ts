import { AxiosError } from 'axios';

import useAuthQuery from '@hooks/useAuthQuery';
import { ApiResponse } from '@typings/types';
import { clientAxios } from '@utils/commonAxios';

const useFetchChatUrl = (groupArticleId: number, enabled: boolean) => {
  const { data } = useAuthQuery<ApiResponse<{ chatUrl: string }>, AxiosError, string>(
    ['chatUrl', groupArticleId],
    () => clientAxios.get(`/v1/group-articles/${groupArticleId}/chat-url`),
    {
      select: (res) => res.data.data.chatUrl,
      enabled,
    }
  );

  return { url: data };
};

export default useFetchChatUrl;
