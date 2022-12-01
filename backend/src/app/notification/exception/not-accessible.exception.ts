import { ForbiddenException } from '@nestjs/common';

export class NotAccessibleException extends ForbiddenException {
  constructor(message = '정보에 접근할 수 없습니다') {
    super({ status: 'NOT_ACCESSIBLE', message });
  }
}
