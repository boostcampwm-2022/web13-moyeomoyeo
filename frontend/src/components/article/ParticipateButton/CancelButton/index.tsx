import { Button } from '@mantine/core';
import { useState } from 'react';
import AlertModal from '@components/common/AlertModal';

const CancelButton = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const cancelApplication = () => {
    // TODO API 호출
    setModalOpen(true);
  };

  return (
    <>
      <Button onClick={cancelApplication} size="md" color="red" fullWidth>
        참가 취소
      </Button>
      {modalOpen && (
        <AlertModal
          message="참가 신청이 취소되었습니다"
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
};

export default CancelButton;
