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
      blurThumbnail,
      location,
      chatUrl,
      maxCapacity,
      category,
    }: {
      title: string;
      contents: string;
      thumbnail: string;
      blurThumbnail: string;
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
      blurThumbnail,
    });
    return article;
  }

  update(
    user: User,
    {
      title,
      contents,
      thumbnail,
      blurThumbnail,
      chatUrl,
    }: {
      title: string;
      contents: string;
      thumbnail: string;
      blurThumbnail: string;
      chatUrl: string;
    },
  ) {
    if (!this.isAuthor(user)) {
      throw new NotAuthorException();
    }

    this.title = title;
    this.contents = contents;
    this.group.thumbnail = thumbnail;
    this.group.blurThumbnail = blurThumbnail;
    this.group.chatUrl = chatUrl;
  }

  remove(user: User) {
    if (!this.isAuthor(user)) {
      throw new NotAuthorException();
    }

    this.group.cancel();
    this.deletedAt = new Date();
  }

  complete(user: User) {
    if (!this.isAuthor(user)) {
      throw new NotAuthorException();
    }

    if (this.group.status !== GROUP_STATUS.PROGRESS) {
      throw new NotProgressGroupException(
        '모집중인 게시글만 모집완료할 수 있습니다',
      );
    }

    this.group.complete();
  }

  cancel(user: User) {
    if (!this.isAuthor(user)) {
      throw new NotAuthorException();
    }

    if (this.group.status !== GROUP_STATUS.PROGRESS) {
      throw new NotProgressGroupException(
        '모집중인 게시글만 모집중단할 수 있습니다',
      );
    }

    this.group.cancel();
  }

  isAuthor(user: User) {
    return this.userId === user.id;
  }
}
