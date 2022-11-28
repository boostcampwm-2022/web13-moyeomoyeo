import { useState } from 'react';

import { Button } from '@mantine/core';

import AlertModal from '@components/common/AlertModal';

const ApplyButton = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [resultMessage, setResultMessage] = useState<string>('');

  // TODO API 호출 및 성공 여부에 따른 message
  const applyForRecruitment = () => {
    setResultMessage('참가 신청이 완료되었습니다');
    setModalOpen(true);
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
