import { Button } from '@mantine/core';

import useApplyGroup from '@hooks/queries/useApplyGroup';
import { showToast } from '@utils/toast';

interface Props {
  groupArticleId: number;
}

const ApplyButton = ({ groupArticleId }: Props) => {
  const { mutate: applyGroup } = useApplyGroup(groupArticleId);

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
      <Button onClick={applyForRecruitment} size="md" color="indigo" fullWidth>
        참가하기
      </Button>
    </>
  );
};

export default ApplyButton;
