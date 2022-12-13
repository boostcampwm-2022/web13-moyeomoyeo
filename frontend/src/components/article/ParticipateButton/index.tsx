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
  switch (status) {
    case ParticipateButtonStatus.APPLY:
      return <ApplyButton groupArticleId={groupArticleId} />;
    case ParticipateButtonStatus.CANCEL:
      return <CancelButton groupArticleId={groupArticleId} />;
    case ParticipateButtonStatus.CLOSED:
      return (
        <Button size="md" disabled fullWidth>
          모집 마감
        </Button>
      );
    case ParticipateButtonStatus.LINK:
      return <ChatLinkButton chatLink={chatRoomLink} />;
  }
};

export default ParticipateButton;
