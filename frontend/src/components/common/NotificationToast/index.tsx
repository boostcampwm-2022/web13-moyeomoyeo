import { useRouter } from 'next/router';

import useNotificationEvent from '@hooks/useNotificationEvent';
import { showToast } from '@utils/toast';

const NotificationToast = () => {
  const { isReady, pathname } = useRouter();

  useNotificationEvent({
    onNotification: (e) => {
      showToast({ title: '알림 도착!', message: '알림 페이지에서 내용을 확인해보세요.' });
    },
    enabled: isReady && pathname !== '/notification',
  });

  return <></>;
};

export default NotificationToast;
