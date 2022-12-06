import { NotFoundException } from '@nestjs/common';

export class GroupNotFoundException extends NotFoundException {
  constructor(message = '해당 그룹이 존재하지 않습니다.') {
    super({ status: 'GROUP_NOT_FOUND', message });
  }
}
