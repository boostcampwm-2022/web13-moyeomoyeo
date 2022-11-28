import { ChildEntity, OneToOne } from 'typeorm';
import { Article } from '@app/group-article/entity/article.entity';
import { Group } from '@app/group-article/entity/group.entity';
import { GroupCategory } from './group-category.entity';

@ChildEntity('GROUP')
export class GroupArticle extends Article {
  @OneToOne(() => Group, (group) => group.article, {
    eager: true,
    cascade: ['insert'],
  })
  group: Group;

  static register({
    title,
    contents,
    type,
    thumbnail,
    location,
    chatUrl,
    maxCapacity,
    category,
  }: {
    title: string;
    contents: string;
    type: string;
    thumbnail: string;
    location: string;
    chatUrl: string;
    maxCapacity: number;
    category: GroupCategory;
  }) {
    const article = new GroupArticle();
    article.title = title;
    article.contents = contents;
    article.type = type;
    article.thumbnail = thumbnail;
    article.group = Group.register({
      location,
      chatUrl,
      maxCapacity,
      category,
    });
    return article;
  }

  delete() {
    this.deletedAt = new Date();
  }
}
