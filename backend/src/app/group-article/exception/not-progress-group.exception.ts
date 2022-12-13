import { BadRequestException } from '@nestjs/common';

export class NotProgressGroupException extends BadRequestException {
  constructor(message = '모집중이 아닙니다') {
    super({ status: 'NOT_PROGRESS_GROUP', message });
  }
}
