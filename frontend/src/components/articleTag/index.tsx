import { Badge } from '@mantine/core';
import styled from '@emotion/styled';
import { BADGE_COLORS } from '@constants/color';

interface Props {
  /**
   * 카테고리 id, 지역 id 등 뱃지 옵션의 id를 입력합니다.
   * id를 통해 색상이 결정됩니다.
   */
  id: number;
  /**
   * 뱃지에 들어갈 내용이 입력됩니다.
   */
  content: string;
}

const ArticleTag = ({ id, content }: Props) => {
  const getBadgeColor = (targetId: number) => {
    const colorCount = BADGE_COLORS.length;
    return BADGE_COLORS[targetId % colorCount];
  };

  return (
    <BadgeWrapper>
      <Badge color={getBadgeColor(id)} size="sm">
        {content}
      </Badge>
    </BadgeWrapper>
  );
};

const BadgeWrapper = styled.div`
  width: fit-content;
`;

export default ArticleTag;
