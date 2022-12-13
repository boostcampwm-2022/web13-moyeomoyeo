import { NotFoundException } from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
  constructor(message = '해당 유저가 존재하지 않습니다.') {
    super({ status: 'USER_NOT_FOUND', message });
  }
}
