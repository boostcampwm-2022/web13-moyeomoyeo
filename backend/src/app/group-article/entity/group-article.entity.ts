import { ChildEntity, OneToOne } from 'typeorm';
import { Article } from '@app/group-article/entity/article.entity';
import { Group } from '@app/group-article/entity/group.entity';
import { GroupCategory } from '@app/group-article/entity/group-category.entity';
import {
  ARTICLE,
  GROUP_STATUS,
  LOCATION,
} from '@app/group-article/constants/group-article.constants';
import { User } from '@app/user/entity/user.entity';
import { NotAuthorException } from '@app/group-article/exception/not-author.exception';
import { NotProgressGroupException } from '@app/group-article/exception/not-progress-group.exception';

@ChildEntity(ARTICLE.GROUP)
export class GroupArticle extends Article {
  @OneToOne(() => Group, (group) => group.article, {
    eager: true,
    cascade: ['insert', 'update'],
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

  remove(user: User) {
    if (this.userId !== user.id) {
      throw new NotAuthorException();
    }

    this.group.status = GROUP_STATUS.FAIL;
    this.deletedAt = new Date();
  }

  complete() {
    if (this.group.status !== GROUP_STATUS.PROGRESS) {
      throw new NotProgressGroupException(
        '모집중인 게시글만 모집완료 처리할 수 있습니다',
      );
    }

    this.group.status = GROUP_STATUS.SUCCEED;
  }
}
