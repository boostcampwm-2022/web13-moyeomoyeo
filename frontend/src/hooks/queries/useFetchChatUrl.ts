import { AxiosError } from 'axios';

import useAuthQuery from '@hooks/useAuthQuery';
import { ApiResponse } from '@typings/types';
import { clientAxios } from '@utils/commonAxios';

const useFetchChatUrl = (groupArticleId: number) => {
  const { data } = useAuthQuery<ApiResponse<{ url: string }>, AxiosError, string>(
    ['chatUrl', groupArticleId],
    () => clientAxios.get(`/v1/group-applications/${groupArticleId}/chat-url`),
    {
      select: (res) => res.data.data.url,
    }
  );

  return { isJoined: data };
};

export default useFetchChatUrl;
