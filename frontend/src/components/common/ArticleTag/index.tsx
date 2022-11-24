import { Badge } from '@mantine/core';
import styled from '@emotion/styled';

interface Props {
  /**
   * 뱃지의 색상을 결정합니다. 존재하지 않는 색상을 입력할 경우, indigo로 설정됩니다.
   */
  color: string;
  /**
   * 뱃지에 들어갈 내용이 입력됩니다.
   */
  content: string;
  size?: 'sm' | 'lg';
}

const ArticleTag = ({ color, content, size = 'sm' }: Props) => {
  return (
    <BadgeWrapper>
      <Badge color={color} size={size} radius="sm">
        {content}
      </Badge>
    </BadgeWrapper>
  );
};

const BadgeWrapper = styled.div`
  width: fit-content;
`;

export default ArticleTag;
