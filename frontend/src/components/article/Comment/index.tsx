import { Text } from '@mantine/core';

import Avatar from '@components/common/Avatar';
import { CommentType } from '@typings/types';
import dateTimeFormat from '@utils/dateTime';

import {
  CommentAuthor,
  CommentContent,
  CommentHeader,
  CommentUtilItem,
  CommentUtils,
  CommentWrapper,
} from './styles';

interface Props {
  /**
   * 댓글 정보를 입력합니다.
   */
  comment: CommentType;
}

const Comment = ({ comment }: Props) => {
  return (
    <CommentWrapper>
      <CommentHeader>
        <CommentAuthor>
          <Avatar size="sm" src={comment.authorProfileImage} alt={comment.authorName} />
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
