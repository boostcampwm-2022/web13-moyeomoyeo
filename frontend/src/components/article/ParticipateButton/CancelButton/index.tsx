import { Button } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons';

import useCancelApplication from '@hooks/queries/useCancelApplication';

interface Props {
  groupArticleId: number;
}

const CancelButton = ({ groupArticleId }: Props) => {
  const { mutate: cancelApplication } = useCancelApplication(groupArticleId);

  const handleClickCancelButton = () => {
    cancelApplication(groupArticleId, {
      onSuccess: () => {
        // TODO 공통 toast message 로직 적용
        showNotification({
          color: 'indigo',
          title: '신청 취소 완료!',
          message: '다른 모집 게시글도 확인해보세요.',
          icon: <IconCheck size={16} />,
          autoClose: 4000,
          styles: (theme) => ({
            root: {
              paddingTop: '1.6rem',
              paddingBottom: '1.6rem',
            },
            title: {
              fontSize: theme.fontSizes.lg,
              fontWeight: 700,
            },
          }),
        });
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
