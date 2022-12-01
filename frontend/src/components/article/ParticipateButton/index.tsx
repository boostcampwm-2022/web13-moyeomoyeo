import { Button } from '@mantine/core';

import ApplyButton from '@components/article/ParticipateButton/ApplyButton';
import CancelButton from '@components/article/ParticipateButton/CancelButton';
import ChatLinkButton from '@components/article/ParticipateButton/ChatLinkButton';
import { ParticipateButtonStatus } from '@constants/participateButton';

interface Props {
  status: ParticipateButtonStatus;
  groupArticleId: number;
  chatRoomLink?: string;
}

const ParticipateButton = ({ status, groupArticleId, chatRoomLink = '' }: Props) => {
  return (
    <>
      {status === ParticipateButtonStatus.APPLY && <ApplyButton groupArticleId={groupArticleId} />}
      {status === ParticipateButtonStatus.CANCEL && (
        <CancelButton groupArticleId={groupArticleId} />
      )}
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
