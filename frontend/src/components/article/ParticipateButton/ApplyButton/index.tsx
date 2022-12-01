import { Button } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons';

import useApplyGroup from '@hooks/queries/useApplyGroup';

interface Props {
  groupArticleId: number;
}

const ApplyButton = ({ groupArticleId }: Props) => {
  const { mutate: applyGroup } = useApplyGroup(groupArticleId);

  const applyForRecruitment = () => {
    applyGroup(groupArticleId, {
      onSuccess: () => {
        // TODO 공통 toast message 로직 적용
        showNotification({
          color: 'indigo',
          title: '참가 신청 완료!',
          message: '모집이 성공적으로 완료될 때까지 조금만 기다려주세요.',
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
      <Button onClick={applyForRecruitment} size="md" color="indigo" fullWidth>
        참가하기
      </Button>
    </>
  );
};

export default ApplyButton;
