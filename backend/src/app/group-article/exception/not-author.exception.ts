import { ForbiddenException } from '@nestjs/common';

export class NotAuthorException extends ForbiddenException {
  constructor(message = '작성자가 아닙니다') {
    super({ status: 'NOT_AUTHOR', message });
  }
}
