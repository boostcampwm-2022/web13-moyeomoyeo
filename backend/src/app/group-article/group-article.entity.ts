import { ChildEntity, OneToOne } from 'typeorm';
import { Article } from '@app/group-article/article.entity';
import { Group } from '@app/group-article/group.entity';

@ChildEntity('GROUP')
export class GroupArticle extends Article {
  @OneToOne(() => Group, (group) => group.article, { eager: true })
  group: Group;
}
