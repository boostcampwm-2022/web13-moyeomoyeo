import Link from 'next/link';
import { useState } from 'react';

import styled from '@emotion/styled';
import { ActionIcon, Text } from '@mantine/core';
import { IconX } from '@tabler/icons';

import AlertModal from '@components/common/AlertModal';
import NotificationIcon from '@components/notification/NotificationIcon';
import { NotificationType } from '@typings/types';
import dateTimeFormat from '@utils/dateTime';

interface Props {
  /**
   * 알림 데이터
   */
  notification: NotificationType;
}

const NotificationItem = ({ notification }: Props) => {
  const { type, title, subTitle, createdAt } = notification;

  const [modalOpen, setModalOpen] = useState(false);

  const handleClickCloseButton = () => {
    setModalOpen(true);
  };

  return (
    <NotificationWrapper>
      <AlertModal
        message="알림을 삭제하시겠습니까?"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
      <Link href={`/article/${notification.groupArticleId}`}>
        <ContentSection>
          <IconWrapper>
            <NotificationIcon variant={type} />
          </IconWrapper>
          <TitleWrapper>
            <Text
              size="md"
              weight={700}
              sx={{ whiteSpace: 'nowrap', overflowX: 'hidden', textOverflow: 'ellipsis' }}
            >
              {title}
            </Text>
            <Text size="sm" color="gray" weight={500}>
              {subTitle}
            </Text>
          </TitleWrapper>
        </ContentSection>
      </Link>
      <AsideSection>
        <ActionIcon variant="transparent" color="gray.6" size="sm" onClick={handleClickCloseButton}>
          <IconX size={20} />
        </ActionIcon>
        <Text size="xs" weight={500} c="gray.6">
          {dateTimeFormat(createdAt)}
        </Text>
      </AsideSection>
    </NotificationWrapper>
  );
};

export default NotificationItem;

const NotificationWrapper = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 5rem;
  gap: 1.6rem;
  padding: 1.6rem;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.gray[2]};
  border-radius: 0.8rem;
`;

const ContentSection = styled.div`
  cursor: pointer;
  width: 100%;
  display: grid;
  grid-template-columns: 2.8rem 1fr;
  gap: 1.6rem;
`;

const IconWrapper = styled.div`
  height: 100%;
  margin-right: 1.6rem;
  display: flex;
  align-items: center;
`;

const TitleWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 0.8rem;
  overflow-x: hidden;
`;

const AsideSection = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  min-width: 4rem;
`;
