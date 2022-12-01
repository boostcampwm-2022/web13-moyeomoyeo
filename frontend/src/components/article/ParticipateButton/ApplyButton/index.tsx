import { useState } from 'react';

import { Button } from '@mantine/core';

import AlertModal from '@components/common/AlertModal';
import useApplyGroup from '@hooks/queries/useApplyGroup';

interface Props {
  groupArticleId: number;
}

const ApplyButton = ({ groupArticleId }: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [resultMessage, setResultMessage] = useState<string>('');

  const { mutate: applyGroup } = useApplyGroup(groupArticleId);

  // TODO toast 메시지로 변경
  const applyForRecruitment = () => {
    applyGroup(groupArticleId, {
      onSuccess: () => {
        setResultMessage('참가 신청이 완료되었습니다');
        setModalOpen(true);
      },
    });
  };

  return (
    <>
      <Button onClick={applyForRecruitment} size="md" color="indigo" fullWidth>
        참가하기
      </Button>
      {modalOpen && (
        <AlertModal message={resultMessage} open={modalOpen} onClose={() => setModalOpen(false)} />
      )}
    </>
  );
};

export default ApplyButton;
