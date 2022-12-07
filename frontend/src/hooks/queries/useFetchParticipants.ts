import { AxiosError } from 'axios';

import useAuthQuery from '@hooks/useAuthQuery';
import { ApiResponse, ParticipantType, UserType } from '@typings/types';
import { clientAxios } from '@utils/commonAxios';

interface ParticipantsResponseType {
  id: number;
  user: ParticipantType;
}

const useFetchParticipants = (groupArticleId: number) => {
  const { data } = useAuthQuery<
    ApiResponse<ParticipantsResponseType[]>,
    AxiosError,
    ParticipantType[]
  >(
    ['participants', groupArticleId],
    () => clientAxios.get(`/v1/group-applications/participants`, { params: { groupArticleId } }),
    {
      select: (res) =>
        res.data.data.map(
          (participant: { user: Omit<UserType, 'githubUrl' | 'blogUrl'> }) => participant.user
        ),
    }
  );

  return { data };
};

export default useFetchParticipants;
