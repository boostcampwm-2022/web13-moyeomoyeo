import { Button } from '@mantine/core';
import { ParticipateButtonStatus } from '@constants/participateButton';
import ChatLinkButton from '@components/article/ParticipateButton/ChatLinkButton';
import ApplyButton from '@components/article/ParticipateButton/ApplyButton';
import CancelButton from '@components/article/ParticipateButton/CancelButton';

interface Props {
  status: ParticipateButtonStatus;
  chatRoomLink?: string;
}

const ParticipateButton = ({ status, chatRoomLink = '' }: Props) => {
  return (
    <>
      {status === ParticipateButtonStatus.APPLY && <ApplyButton />}
      {status === ParticipateButtonStatus.CANCEL && <CancelButton />}
      {status === ParticipateButtonStatus.CLOSED && (
        <Button size="md" disabled fullWidth>
          모집 마감
        </Button>
      )}
      {status === ParticipateButtonStatus.LINK && <ChatLinkButton chatLink={chatRoomLink} />}
    </>
  );
};

export default ParticipateButton;
