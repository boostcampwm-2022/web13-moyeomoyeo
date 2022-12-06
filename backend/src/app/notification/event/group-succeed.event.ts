import { GroupArticle } from '@app/group-article/entity/group-article.entity';

export class GroupSucceedEvent {
  groupArticle: GroupArticle;

  constructor(groupArticle: GroupArticle) {
    this.groupArticle = groupArticle;
  }
}
