import { useEffect } from 'react';

import useFetchMyInfo from '@hooks/queries/useFetchMyInfo';

interface Props {
  onNotification: (e: MessageEvent) => void;
  enabled?: boolean;
}

const useNotificationEvent = ({ onNotification, enabled = true }: Props) => {
  const { data: myData } = useFetchMyInfo();
  useEffect(() => {
    if (!enabled || !myData) return;
    let sse: EventSource | null = null;
    try {
      sse = new EventSource(`${process.env.NEXT_PUBLIC_API_URL}/v1/sse`, {
        withCredentials: true,
      });

      sse.addEventListener('NOTIFICATION', onNotification);

      sse.onerror = (event) => {
        sse.close();
      };
    } catch (err) {
      throw Error('Server Sent Event Error');
    }
    return () => {
      if (sse) sse.close();
    };
  }, [myData, onNotification, enabled]);
};

export default useNotificationEvent;
