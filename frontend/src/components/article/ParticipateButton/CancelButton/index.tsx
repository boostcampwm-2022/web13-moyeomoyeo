import { Button } from '@mantine/core';

import { modals } from '@components/common/Modals';
import useCancelApplication from '@hooks/queries/useCancelApplication';
import useModals from '@hooks/useModals';
import { showToast } from '@utils/toast';

interface Props {
  groupArticleId: number;
}

const CancelButton = ({ groupArticleId }: Props) => {
  const { mutate: cancelApplication } = useCancelApplication(groupArticleId);
  const { openModal, closeModal } = useModals();

  const handleClickConfirmButton = () => {
    cancelApplication(groupArticleId, {
      onSuccess: () => {
        showToast({ title: '신청 취소 완료!', message: '다른 모집 게시글도 확인해보세요.' });
      },
    });
    closeModal(modals.confirm);
  };

  return (
    <Button
      onClick={() =>
        openModal(modals.confirm, {
          message: '신청을 취소하시겠습니까?',
          onConfirmButtonClick: handleClickConfirmButton,
          onCancelButtonClick: () => closeModal(modals.confirm),
        })
      }
      size="md"
      color="red"
      fullWidth
    >
      참가 취소
    </Button>
  );
};

export default CancelButton;
