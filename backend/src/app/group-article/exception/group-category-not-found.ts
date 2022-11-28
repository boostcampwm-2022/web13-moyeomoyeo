import { NotFoundException } from '@nestjs/common';

export class GroupCategoryNotFound extends NotFoundException {
  constructor(message = '해당 카테고리가 존재하지 않습니다.') {
    super({ status: 'GROUP_CATEGORY_NOT_FOUND', message });
  }
}
