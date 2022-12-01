import { useState } from 'react';

import { Button } from '@mantine/core';

import AlertModal from '@components/common/AlertModal';
import useApplyGroup from '@hooks/queries/useApplyGroup';

interface Props {
  groupArticleId: number;
}

const CancelButton = ({ groupArticleId }: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const { mutate: cancelApplication } = useApplyGroup(groupArticleId);

  // TODO toast 메시지로 변경
  const handleClickCancelButton = () => {
    cancelApplication(groupArticleId, {
      onSuccess: () => {
        setModalOpen(true);
      },
    });
  };

  return (
    <>
      <Button onClick={handleClickCancelButton} size="md" color="red" fullWidth>
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
