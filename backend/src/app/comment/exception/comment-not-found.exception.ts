import { NotFoundException } from '@nestjs/common';

export class CommentNotFoundException extends NotFoundException {
  constructor(message = '해당 댓글이 존재하지 않습니다.') {
    super({ status: 'COMMENT_NOT_FOUND', message });
  }
}
