import { BadRequestException } from '@nestjs/common';

export class CannotApplicateException extends BadRequestException {
  constructor(message = '당신이 만든 그룹에 신청을 할 수 없습니다.!') {
    super({ status: 'CAN_NOT_APPLICATE_BAD_REQUEST', message });
  }
}
