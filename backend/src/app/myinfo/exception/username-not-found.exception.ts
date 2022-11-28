import { NotFoundException } from '@nestjs/common';

export class UsernameNotFoundException extends NotFoundException {
  constructor(message = '해당 유저이름을 가진 유저가가 존재하지 않습니다.') {
    super({ status: 'USERNAME_NOT_FOUND', message });
  }
}
