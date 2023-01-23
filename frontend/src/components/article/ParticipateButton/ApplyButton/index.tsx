import { Button } from '@mantine/core';

import { modals } from '@components/common/Modals';
import useApplyGroup from '@hooks/queries/useApplyGroup';
import useModals from '@hooks/useModals';
import { showToast } from '@utils/toast';

interface Props {
  groupArticleId: number;
}

const ApplyButton = ({ groupArticleId }: Props) => {
  const { mutate: applyGroup } = useApplyGroup(groupArticleId);
  const { openModal, closeModal } = useModals();

  const handleClickApplyConfirm = () => {
    applyGroup(groupArticleId, {
      onSuccess: () => {
        showToast({
          title: '참가 신청 완료!',
          message: '모집이 성공적으로 완료될 때까지 조금만 기다려주세요.',
        });
      },
    });
    closeModal(modals.confirm);
  };

  return (
    <Button
      onClick={() =>
        openModal(modals.confirm, {
          message: '참가 신청하시겠습니까?',
          onConfirmButtonClick: handleClickApplyConfirm,
          onCancelButtonClick: () => closeModal(modals.confirm),
        })
      }
      size="md"
      color="indigo"
      fullWidth
    >
      참가하기
    </Button>
  );
};

export default ApplyButton;
