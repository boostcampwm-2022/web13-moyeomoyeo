import { ComponentMeta, ComponentStory } from '@storybook/react';

import styled from '@emotion/styled';

import { Notification } from '@constants/notification';

import NotificationItem from '.';

export default {
  title: 'Component/NotificationItem',
  component: NotificationItem,
} as ComponentMeta<typeof NotificationItem>;

const Template: ComponentStory<typeof NotificationItem> = (args) => <NotificationItem {...args} />;

export const AddComment = Template.bind({});
AddComment.args = {
  notification: {
    id: 1,
    type: Notification.COMMENT_ADDED,
    title: '박종혁님이 게시글에 댓글을 남겼어요.',
    subTitle: '홀리 쮓',
    groupArticleId: 1,
    createdAt: '2021-08-01T00:00:00.000Z',
  },
};

export const GroupSuccess = Template.bind({});
GroupSuccess.args = {
  notification: {
    id: 1,
    type: Notification.GROUP_SUCCEED,
    title: '훠궈 먹읍시다',
    subTitle: '홀리 쮓',
    groupArticleId: 2,
    createdAt: '2022-02-01T00:00:00.000Z',
  },
};

export const GroupFail = Template.bind({});
GroupFail.args = {
  notification: {
    id: 1,
    type: Notification.GROUP_FAILED,
    title: '모임이 무산되었어요.',
    subTitle: '캐럿스터디 - 인천',
    groupArticleId: 3,
    createdAt: '2021-08-01T00:00:00.000Z',
  },
};

const PageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1.6rem;
  gap: 1.6rem;
`;

const PageTemplate: ComponentStory<typeof NotificationItem> = (args) => (
  <PageWrapper>
    <NotificationItem {...args} />
    <NotificationItem {...args} />
    <NotificationItem {...args} />
    <NotificationItem {...args} />
    <NotificationItem {...args} />
    <NotificationItem {...args} />
  </PageWrapper>
);

export const Collection = PageTemplate.bind({});
Collection.args = {
  notification: {
    id: 1,
    type: Notification.GROUP_FAILED,
    title: '모임이 무산되었어요.',
    subTitle: '캐럿스터디 - 인천',
    groupArticleId: 3,
    createdAt: '2021-08-01T00:00:00.000Z',
  },
};
