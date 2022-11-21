import { NotFoundException } from '@nestjs/common';

export class ApiNotFoundException extends NotFoundException {
  constructor(message = '해당하는 API가 존재하지 않습니다') {
    super({ status: 'API_NOT_FOUND', message });
  }
}
