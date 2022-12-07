import { ComponentMeta, ComponentStory } from '@storybook/react';

import Comment from '.';

export default {
  title: 'Component/Comment',
  component: Comment,
} as ComponentMeta<typeof Comment>;

const mockComment = {
  id: 1,
  authorId: 2,
  authorName: 'J999_김캠퍼',
  authorProfileImage: 'https://avatars.githubusercontent.com/u/90585081?v=4"',
  contents:
    '좋은 글 잘 읽었습니다!좋은 글 잘 읽었습니다좋은 글 잘 읽었습니다좋은 글 잘 읽었습니다좋은 글 잘 읽었습니다',
  createdAt: '2022-11-23T08:19:33.899Z',
};

const Template: ComponentStory<typeof Comment> = (args) => <Comment {...args} />;

export const Default = Template.bind({});
Default.args = {
  comment: mockComment,
};
