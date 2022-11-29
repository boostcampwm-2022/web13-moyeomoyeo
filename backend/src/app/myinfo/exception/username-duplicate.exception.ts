import { BadRequestException } from '@nestjs/common';

export class UserNameDuplicateException extends BadRequestException {
  constructor(
    message = '중복된 유저이름으로 요청했습니다! 해당 유저이름으로 바꿀 수 없습니다.',
  ) {
    super({ status: 'USER_NAME_DUPLICATE_BAD_REQUEST', message });
  }
}
