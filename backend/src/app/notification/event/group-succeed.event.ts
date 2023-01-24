import { GroupArticle } from '@app/group-article/entity/group-article.entity';

export class GroupSucceedEvent {
  static readonly event = 'group.succeed';
  groupArticle: GroupArticle;

  constructor(groupArticle: GroupArticle) {
    this.groupArticle = groupArticle;
  }
}
