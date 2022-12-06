import { BadRequestException } from '@nestjs/common';

export class NotSuccessGroupException extends BadRequestException {
  constructor(message = '모집완료되지 않은 게시글입니다') {
    super({ status: 'NOT_SUCCESS_GROUP', message });
  }
}
