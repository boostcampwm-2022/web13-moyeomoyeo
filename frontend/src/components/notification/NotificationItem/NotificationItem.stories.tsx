import { ComponentMeta, ComponentStory } from '@storybook/react';

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
    type: Notification.ADD_COMMENT,
    title: '박종혁님이 게시글에 댓글을 남겼어요.',
    subTitle: '홀리 쮓',
    createdAt: '2021-08-01T00:00:00.000Z',
  },
};

export const GroupSuccess = Template.bind({});
GroupSuccess.args = {
  notification: {
    id: 1,
    type: Notification.GROUP_SUCCESS,
    title: '훠궈 먹읍시다',
    subTitle: '홀리 쮓',
    createdAt: '2022-02-01T00:00:00.000Z',
  },
};

export const GroupFail = Template.bind({});
GroupFail.args = {
  notification: {
    id: 1,
    type: Notification.GROUP_FAIL,
    title: '모임이 무산되었어요.',
    subTitle: '캐럿스터디 - 인천',
    createdAt: '2021-08-01T00:00:00.000Z',
  },
};
