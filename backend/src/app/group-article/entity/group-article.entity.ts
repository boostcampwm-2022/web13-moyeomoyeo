import { ChildEntity, OneToOne } from 'typeorm';
import { Article } from '@app/group-article/entity/article.entity';
import { Group } from '@app/group-article/entity/group.entity';
import { GroupCategory } from '@app/group-article/entity/group-category.entity';
import {
  ARTICLE,
  LOCATION,
} from '@app/group-article/constants/group-article.constants';
import { User } from '@app/user/entity/user.entity';

@ChildEntity(ARTICLE.GROUP)
export class GroupArticle extends Article {
  @OneToOne(() => Group, (group) => group.article, {
    eager: true,
    cascade: ['insert'],
  })
  group: Group;

  static create(
    user: User,
    {
      title,
      contents,
      thumbnail,
      location,
      chatUrl,
      maxCapacity,
      category,
    }: {
      title: string;
      contents: string;
      thumbnail: string;
      location: LOCATION;
      chatUrl: string;
      maxCapacity: number;
      category: GroupCategory;
    },
  ) {
    const article = new GroupArticle();
    article.title = title;
    article.contents = contents;
    article.type = ARTICLE.GROUP;
    article.user = Promise.resolve(user);
    article.group = Group.create({
      location,
      chatUrl,
      maxCapacity,
      category,
      thumbnail,
    });
    return article;
  }
}
