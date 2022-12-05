import styled from '@emotion/styled';

import EmptyMessage from '@components/common/EmptyMessage';
import Header from '@components/common/Header';
import RootTitle from '@components/common/Header/RootTitle';
import UserLoginItem from '@components/common/Header/UserLoginItem';
import NavigationTab from '@components/common/NavigationTab';
import PageLayout from '@components/common/PageLayout';
import NotificationItem from '@components/notification/NotificationItem';
import { PAGE_TITLE } from '@constants/pageTitle';
import { NotificationType } from '@typings/types';

const dummyNotifications: NotificationType[] = [
  {
    id: 1,
    type: 'ADD_COMMENT',
    title: '박종혁님이 게시글에 댓글을 남겼어요.',
    subTitle: '홀리 쮓',
    createdAt: '2021-08-01T00:00:00.000Z',
  },
  {
    id: 2,
    type: 'GROUP_SUCCESS',
    title: '훠궈 먹읍시다',
    subTitle: '홀리 쮓',
    createdAt: '2022-02-01T00:00:00.000Z',
  },
  {
    id: 3,
    type: 'GROUP_FAIL',
    title: '모임이 무산되었어요.',
    subTitle: '캐럿스터디 - 인천',
    createdAt: '2021-08-01T00:00:00.000Z',
  },
];

const Notification = () => {
  /**
   * TODO : API 붙이기
   */
  const notifications = dummyNotifications;
  return (
    <PageLayout
      header={
        <Header
          leftNode={
            <RootTitle
              title={PAGE_TITLE.NOTIFICATION.title}
              subTitle={PAGE_TITLE.NOTIFICATION.subTitle}
            />
          }
          rightNode={<UserLoginItem />}
        />
      }
      footer={<NavigationTab />}
    >
      <PageWrapper>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} />
          ))
        ) : (
          <EmptyMessage target="notification" large />
        )}
      </PageWrapper>
    </PageLayout>
  );
};

export default Notification;

const PageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1.6rem;
  gap: 1.6rem;
`;
