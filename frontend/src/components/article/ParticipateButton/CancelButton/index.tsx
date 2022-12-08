import { useState } from 'react';

import { Button } from '@mantine/core';

import ConfirmModal from '@components/common/ConfirmModal';
import useCancelApplication from '@hooks/queries/useCancelApplication';
import { showToast } from '@utils/toast';

interface Props {
  groupArticleId: number;
}

const CancelButton = ({ groupArticleId }: Props) => {
  const { mutate: cancelApplication } = useCancelApplication(groupArticleId);
  const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);

  const handleClickCancelButton = () => {
    cancelApplication(groupArticleId, {
      onSuccess: () => {
        showToast({ title: '신청 취소 완료!', message: '다른 모집 게시글도 확인해보세요.' });
      },
    });
  };

  return (
    <>
      <Button onClick={() => setConfirmModalOpen(true)} size="md" color="red" fullWidth>
        참가 취소
      </Button>
      <ConfirmModal
        message="신청을 취소하시겠습니까?"
        open={confirmModalOpen}
        onConfirmButtonClick={handleClickCancelButton}
        onCancelButtonClick={() => setConfirmModalOpen(false)}
      />
    </>
  );
};

export default CancelButton;
