import { useState } from 'react';

import { Button } from '@mantine/core';

import ConfirmModal from '@components/common/ConfirmModal';
import useApplyGroup from '@hooks/queries/useApplyGroup';
import { showToast } from '@utils/toast';

interface Props {
  groupArticleId: number;
}

const ApplyButton = ({ groupArticleId }: Props) => {
  const { mutate: applyGroup } = useApplyGroup(groupArticleId);
  const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);

  const applyForRecruitment = () => {
    applyGroup(groupArticleId, {
      onSuccess: () => {
        showToast({
          title: '참가 신청 완료!',
          message: '모집이 성공적으로 완료될 때까지 조금만 기다려주세요.',
        });
      },
    });
  };

  return (
    <>
      <Button onClick={() => setConfirmModalOpen(true)} size="md" color="indigo" fullWidth>
        참가하기
      </Button>
      <ConfirmModal
        message="참가 신청하시겠습니까?"
        open={confirmModalOpen}
        onConfirmButtonClick={applyForRecruitment}
        onCancelButtonClick={() => setConfirmModalOpen(false)}
      />
    </>
  );
};

export default ApplyButton;
