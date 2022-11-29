import { NotFoundException } from '@nestjs/common';

export class GroupArticleNotFoundException extends NotFoundException {
  constructor(message = '해당하는 모집 게시글이 존재하지 않습니다') {
    super({ status: 'GROUP_ARTICLE_NOT_FOUND', message });
  }
}
