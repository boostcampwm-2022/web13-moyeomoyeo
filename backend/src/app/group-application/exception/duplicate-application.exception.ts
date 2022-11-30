import { BadRequestException } from '@nestjs/common';

export class DuplicateApplicationException extends BadRequestException {
  constructor(message = '이미 신청되어 있는 유저입니다.') {
    super({ status: 'DUPLICATE_APPLICATION_BAD_REQUEST', message });
  }
}
