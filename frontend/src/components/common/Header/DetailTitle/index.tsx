import { useRouter } from 'next/router';

import { ActionIcon, Text, Title } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons';

import { DetailTitleTextWrapper, DetailTitleWrapper } from './styles';

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
