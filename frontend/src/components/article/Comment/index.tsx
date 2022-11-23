import { Avatar, Text } from '@mantine/core';
import dateTimeFormat from '@utils/dateTime';
import { Comment as CommentItem } from '@typings/types';
import {
  CommentWrapper,
  CommentHeader,
  CommentAuthor,
  CommentUtils,
  CommentUtilItem,
  CommentContent,
} from './styles';

/**
 * mockComment 지우면 props의 optional 지우기
 */
const mockComment = {
  id: 1,
  authorId: 2,
  authorName: 'J999_김캠퍼',
  authorProfileImage: 'https://avatars.githubusercontent.com/u/90585081?v=4"',
  contents:
    '좋은 글 잘 읽었습니다!좋은 글 잘 읽었습니다좋은 글 잘 읽었습니다좋은 글 잘 읽었습니다좋은 글 잘 읽었습니다',
  createdAt: '2022-11-23T08:19:33.899Z',
};

interface Props {
  /**
   * 댓글 정보를 입력합니다.
   */
  comment?: CommentItem;
}

const Comment = ({ comment = mockComment }: Props) => {
  return (
    <CommentWrapper>
      <CommentHeader>
        <CommentAuthor>
          <Avatar size="sm" src={comment.authorProfileImage} alt={comment.authorName} radius="xl" />
          <Text fz="md" fw={500}>
            {comment.authorName}
          </Text>
          <Text fz="sm" fw={300} c="gray.4">
            {dateTimeFormat(comment.createdAt)}
          </Text>
        </CommentAuthor>
        <CommentUtils>
          <CommentUtilItem onClick={() => alert('삭제 하실?')}>
            <Text fz="sm" fw={500} c="gray.4">
              삭제
            </Text>
          </CommentUtilItem>
        </CommentUtils>
      </CommentHeader>
      <CommentContent>
        <Text fz="lg" fw={500}>
          {comment.contents}
        </Text>
      </CommentContent>
    </CommentWrapper>
  );
};

export default Comment;
