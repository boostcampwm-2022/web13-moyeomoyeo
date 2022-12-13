import styled from '@emotion/styled';

import EmptyMessage from '@components/common/EmptyMessage';
import Header from '@components/common/Header';
import RootTitle from '@components/common/Header/RootTitle';
import UserLoginItem from '@components/common/Header/UserLoginItem';
import NavigationTab from '@components/common/NavigationTab';
import NotificationLoading from '@components/common/NotificationLoading/NotificationLoading';
import PageLayout from '@components/common/PageLayout';
import NotificationItem from '@components/notification/NotificationItem';
import { PAGE_TITLE } from '@constants/pageTitle';
import useFetchNotifications from '@hooks/queries/useFetchNotifications';
import useIntersect from '@hooks/useIntersect';

const NotificationPage = () => {
  const {
    data: notifications,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
  } = useFetchNotifications();

  const ref = useIntersect((entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) {
      void fetchNextPage();
    }
  });

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
        {isLoading && <NotificationLoading />}
        {notifications && (
          <>
            {notifications.length > 0 ? (
              <>
                {notifications.map((notification) => (
                  <NotificationItem key={notification.id} notification={notification} />
                ))}
                <div ref={ref} />
              </>
            ) : (
              <EmptyMessage target="notification" large />
            )}
          </>
        )}
      </PageWrapper>
    </PageLayout>
  );
};

export default NotificationPage;

const PageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1.6rem;
  gap: 1.6rem;
`;
