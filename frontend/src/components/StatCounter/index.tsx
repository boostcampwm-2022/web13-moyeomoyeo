import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { IconHeart, IconBookmark, IconMessageCircle2 } from '@tabler/icons';
import { Text } from '@mantine/core';

export interface Props {
  variant: 'like' | 'comment' | 'scrap';
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
  gap: 0.5rem;
`;

export default StatCounter;
