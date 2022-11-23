import { BadRequestException } from '@nestjs/common';

export class BadParameterException extends BadRequestException {
  constructor(message = '입력값이 올바르지 않습니다') {
    super({ status: 'BAD_PARAMETER', message });
  }
}
