import { IconChevronLeft } from '@tabler/icons';
import { ActionIcon, Title, Text } from '@mantine/core';

import { DetailTitleWrapper, DetailTitleTextWrapper } from './styles';
import { useRouter } from 'next/router';

interface Props {
  title: string;
  subTitle: string;
}

const DetailTitle = ({ title, subTitle }: Props) => {
  const router = useRouter();
  return (
    <DetailTitleWrapper>
      <ActionIcon variant="transparent" color="dark" onClick={() => router.back()}>
        <IconChevronLeft size={24} />
      </ActionIcon>
      <DetailTitleTextWrapper>
        <Title order={4}>{title}</Title>
        <Text fz="xs" fw={500} c="gray.6">
          {subTitle}
        </Text>
      </DetailTitleTextWrapper>
    </DetailTitleWrapper>
  );
};

export default DetailTitle;
