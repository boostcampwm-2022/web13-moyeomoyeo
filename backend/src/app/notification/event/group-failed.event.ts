import { GroupArticle } from '@app/group-article/entity/group-article.entity';

export class GroupFailedEvent {
  static readonly event = 'group.failed';
  groupArticle: GroupArticle;

  constructor(groupArticle: GroupArticle) {
    this.groupArticle = groupArticle;
  }
}
