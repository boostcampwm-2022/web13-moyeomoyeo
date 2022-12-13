import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Text } from '@mantine/core';
import { IconBookmark, IconHeart, IconMessageCircle2 } from '@tabler/icons';

interface Props {
  /**
   * Stat의 종류를 입력합니다.
   * 각각 좋아요, 댓글, 스크랩을 의미합니다.
   */
  variant: 'like' | 'comment' | 'scrap';
  /**
   * Stat의 수를 입력합니다.
   */
  count: number;
}

const StatCounter = ({ variant, count = 0 }: Props) => {
  const {
    colors: { red, cyan, yellow },
  } = useTheme();
  const color = variant === 'like' ? red[7] : variant === 'comment' ? cyan[7] : yellow[7];
  const Icon =
    variant === 'like' ? (
      <IconHeart size={16} color={color} />
    ) : variant === 'comment' ? (
      <IconMessageCircle2 size={16} color={color} />
    ) : (
      <IconBookmark size={16} color={color} />
    );
  return (
    <StatCounterWrapper>
      {Icon}
      <Text fz="md" color={color} weight={500}>
        {count}
      </Text>
    </StatCounterWrapper>
  );
};

const StatCounterWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

export default StatCounter;
