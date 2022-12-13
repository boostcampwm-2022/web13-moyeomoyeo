import { NotFoundException } from '@nestjs/common';

export class ApplicationNotFoundException extends NotFoundException {
  constructor(message = '신청 내역을 확인할 수 없습니다.') {
    super({ status: 'APPLICATION_NOT_FOUND', message });
  }
}
