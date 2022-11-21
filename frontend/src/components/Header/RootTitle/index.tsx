import { Title, Text } from '@mantine/core';
import { RootTitleWrapper } from '@components/Header/RootTitle/styles';

interface Props {
  title: string;
  subTitle: string;
}

const RootTitle = ({ title, subTitle }: Props) => {
  return (
    <RootTitleWrapper>
      <Title order={3}>{title}</Title>
      <Text fz="xs" fw={500} c="gray.6">
        {subTitle}
      </Text>
    </RootTitleWrapper>
  );
};

export default RootTitle;
