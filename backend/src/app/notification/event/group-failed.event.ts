import { GroupArticle } from '@app/group-article/entity/group-article.entity';

export class GroupFailedEvent {
  groupArticle: GroupArticle;

  constructor(groupArticle: GroupArticle) {
    this.groupArticle = groupArticle;
  }
}
