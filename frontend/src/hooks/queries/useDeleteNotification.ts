import { useQueryClient } from '@tanstack/react-query';

import useAuthMutation from '@hooks/useAuthMutation';
import { clientAxios } from '@utils/commonAxios';

const deleteNotification = (notificationId: number) =>
  clientAxios.delete(`/v1/notifications/${notificationId}`);

const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  return useAuthMutation(deleteNotification, {
    onSuccess: () => {
      void queryClient.invalidateQueries(['notifications']);
    },
  });
};

export default useDeleteNotification;
