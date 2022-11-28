import { NotFoundException } from '@nestjs/common';

export class UserIdNotFoundException extends NotFoundException {
  constructor(message = '해당 아이디 값을 가진 유저가 존재하지 않습니다.') {
    super({ status: 'USER_ID_NOT_FOUND', message });
  }
}
