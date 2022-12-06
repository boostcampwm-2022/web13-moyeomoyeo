import { ForbiddenException } from '@nestjs/common';

export class NotAuthorException extends ForbiddenException {
  constructor(message = '해당 참가신청의 본인이 아닙니다.') {
    super({ status: 'NOT_AUTHOR', message });
  }
}
