import { ForbiddenException } from '@nestjs/common';

export class NotAuthorException extends ForbiddenException {
  constructor(message = '해당 댓글의 작성자가 아닙니다.') {
    super({ status: 'NOT_AUTHOR', message });
  }
}
