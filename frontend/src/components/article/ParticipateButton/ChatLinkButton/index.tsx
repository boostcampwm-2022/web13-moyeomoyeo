import { useCallback, useEffect } from 'react';

import { Button } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons';

import useClipboard from '@hooks/useClipboard';

interface Props {
  chatLink: string;
}

const ChatLinkButton = ({ chatLink }: Props) => {
  const { isCopied, setIsCopied, doCopy } = useClipboard();

  const showSuccessToast = useCallback(() => {
    showNotification({
      color: 'indigo',
      title: '오픈 채팅방 링크 복사 완료!',
      message: '지금 바로 채팅에 참여해보세요.',
      icon: <IconCheck size={16} />,
      autoClose: 4000,
      styles: (theme) => ({
        root: {
          paddingTop: '1.6rem',
          paddingBottom: '1.6rem',
        },
        title: {
          fontSize: theme.fontSizes.lg,
          fontWeight: 700,
        },
      }),
    });
    setIsCopied(false);
  }, [setIsCopied]);

  useEffect(() => {
    if (isCopied) showSuccessToast();
  }, [isCopied, showSuccessToast]);

  return (
    <>
      <Button onClick={() => doCopy(chatLink)} size="md" color="indigo" fullWidth>
        오픈채팅방 링크 복사
      </Button>
    </>
  );
};

export default ChatLinkButton;
