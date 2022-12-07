import { Button } from '@mantine/core';

import useCancelApplication from '@hooks/queries/useCancelApplication';
import { showToast } from '@utils/toast';

interface Props {
  groupArticleId: number;
}

const CancelButton = ({ groupArticleId }: Props) => {
  const { mutate: cancelApplication } = useCancelApplication(groupArticleId);

  const handleClickCancelButton = () => {
    cancelApplication(groupArticleId, {
      onSuccess: () => {
        showToast({ title: '신청 취소 완료!', message: '다른 모집 게시글도 확인해보세요.' });
      },
    });
  };

  return (
    <>
      <Button onClick={handleClickCancelButton} size="md" color="red" fullWidth>
        참가 취소
      </Button>
    </>
  );
};

export default CancelButton;
