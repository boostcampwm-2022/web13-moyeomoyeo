import { Button } from '@mantine/core';

import AlertModal from '@components/common/AlertModal';
import useClipboard from '@hooks/useClipboard';

interface Props {
  chatLink: string;
}

const ChatLinkButton = ({ chatLink }: Props) => {
  const { isCopied, setIsCopied, doCopy } = useClipboard();

  return (
    <>
      <Button onClick={() => doCopy(chatLink)} size="md" color="indigo" fullWidth>
        오픈채팅방 링크 복사
      </Button>
      {isCopied && (
        <AlertModal
          message="클립보드에 복사되었습니다"
          open={isCopied}
          onClose={() => setIsCopied(false)}
        />
      )}
    </>
  );
};

export default ChatLinkButton;
