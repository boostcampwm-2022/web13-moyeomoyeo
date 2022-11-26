import { Modal } from '@mantine/core';
import styled from '@emotion/styled';
import ParticipantItem from '@components/article/ParticipantsModal/ParticipantItem';
import Joiner from '@components/common/Joiner';
import { UserType } from '@typings/types';
import EmptyMessage from '@components/common/EmptyMessage';

interface Props {
  participants: Array<Partial<UserType>>;
  open: boolean;
  onClose?: () => void;
}

const ParticipantsModal = ({ participants, open, onClose }: Props) => {
  return (
    <StyledModal title="신청자 목록" opened={open} onClose={onClose} withCloseButton centered>
      {participants.length ? (
        <Joiner
          components={participants.map((participant) => {
            return <ParticipantItem key={participant.id} participant={participant} />;
          })}
        />
      ) : (
        <EmptyMessage target="participant" />
      )}
    </StyledModal>
  );
};

export default ParticipantsModal;

const StyledModal = styled(Modal)`
  & .mantine-Modal-title {
    font-size: 2rem;
    font-weight: 700;
  }

  & .mantine-Modal-body {
    max-height: 27rem;
    overflow: auto;
  }
`;
