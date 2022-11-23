import { Badge } from '@mantine/core';
import styled from '@emotion/styled';

interface Props {
  /**
   * id를 통해 색상이 결정됩니다.
   */
  color: string;
  /**
   * 뱃지에 들어갈 내용이 입력됩니다.
   */
  content: string;
}

const ArticleTag = ({ color, content }: Props) => {
  return (
    <BadgeWrapper>
      <Badge color={color} size="sm">
        {content}
      </Badge>
    </BadgeWrapper>
  );
};

const BadgeWrapper = styled.div`
  width: fit-content;
`;

export default ArticleTag;
