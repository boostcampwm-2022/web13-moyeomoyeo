import { UnauthorizedException } from '@nestjs/common';

export class InvalidTokenException extends UnauthorizedException {
  constructor(message = '토큰정보가 유효하지 않습니다') {
    super({ status: 'INVALID_TOKEN', message });
  }
}
