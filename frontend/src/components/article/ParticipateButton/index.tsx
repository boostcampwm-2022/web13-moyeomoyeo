import { Button } from '@mantine/core';
import { ParticipateButtonStatus } from '@constants/participateButton';
import copyToClipboard from '@utils/copyToClipboard';

interface Props {
  status: ParticipateButtonStatus;
  chatRoomLink?: string;
}

const ParticipateButton = ({ status, chatRoomLink }: Props) => {
  // TODO API 호출 및 성공 여부에 따른 toast message
  const applyForRecruitment = () => {
    alert('참가 신청 완료');
  };

  const cancelApplication = () => {
    alert('참가 취소 완료');
  };

  return (
    <>
      {status === ParticipateButtonStatus.APPLY && (
        <Button onClick={applyForRecruitment} size="md" color="indigo" fullWidth>
          참가하기
        </Button>
      )}
      {status === ParticipateButtonStatus.CANCEL && (
        <Button onClick={cancelApplication} size="md" color="red" fullWidth>
          참가 취소
        </Button>
      )}
      {status === ParticipateButtonStatus.CLOSED && (
        <Button size="md" disabled fullWidth>
          모집 마감
        </Button>
      )}
      {status === ParticipateButtonStatus.LINK && (
        <Button onClick={() => copyToClipboard(chatRoomLink)} size="md" color="indigo" fullWidth>
          오픈채팅방 링크 복사
        </Button>
      )}
    </>
  );
};

export default ParticipateButton;
