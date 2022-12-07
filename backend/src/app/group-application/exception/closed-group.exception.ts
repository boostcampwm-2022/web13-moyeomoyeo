import { BadRequestException } from '@nestjs/common';

export class ClosedGroupException extends BadRequestException {
  constructor(message = '모임이 모집완료 혹은 모집중단 상태입니다.') {
    super({ status: 'CLOSED_GROUP', message });
  }
}
