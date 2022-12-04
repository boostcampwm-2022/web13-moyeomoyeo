import { Injectable } from '@nestjs/common';
import { DataSource, IsNull, Repository } from 'typeorm';
import { GroupArticle } from '@app/group-article/entity/group-article.entity';
import { Group } from '@app/group-article/entity/group.entity';
import { GroupCategory } from '@app/group-article/entity/group-category.entity';
import { GroupApplication } from '@app/group-application/entity/group-application.entity';
import { Scrap } from '@app/scrap/entity/scrap.entity';
import { Comment } from '@app/comment/entity/comment.entity';
import { IGroupArticleSearchResult } from '@app/group-article/dto/group-article-search-result.interface';
import { User } from '@app/user/entity/user.entity';
import { IGroupArticleDetail } from '@app/group-article/dto/group-article-detail.interface';
import {
  CATEGORY,
  GROUP_STATUS,
  LOCATION,
} from '@app/group-article/constants/group-article.constants';

@Injectable()
export class GroupArticleRepository extends Repository<GroupArticle> {
  constructor(private readonly dataSource: DataSource) {
    const baseRepository = dataSource.getRepository(GroupArticle);
    super(
      baseRepository.target,
      baseRepository.manager,
      baseRepository.queryRunner,
    );
  }

  findById(id: number) {
    return this.findOneBy({ id, deletedAt: IsNull() });
  }

  async search({
    limit,
    offset,
    category,
    status,
    location,
  }: {
    limit: number;
    offset: number;
    category?: CATEGORY;
    status?: GROUP_STATUS;
    location?: LOCATION;
  }): Promise<[IGroupArticleSearchResult[], number]> {
    const query = this.createQueryBuilder('groupArticle')
      .select([
        'groupArticle.id as id',
        'groupArticle.title as title',
        'groupArticle.createdAt as createdAt',
        'group.maxCapacity as maxCapacity',
        'group.thumbnail as thumbnail',
        'group.status as status',
        'group.location as location',
        'groupCategory.id as groupCategoryId',
        'groupCategory.name as groupCategoryName',
        'COUNT(DISTINCT groupApplication.id) as currentCapacity',
        'COUNT(DISTINCT scrap.id) as scrapCount',
        'COUNT(DISTINCT comment.id) as commentCount',
      ])
      .leftJoin(Group, 'group', 'groupArticle.id = group.article_id')
      .leftJoin(
        GroupCategory,
        'groupCategory',
        'groupCategory.id = group.category.id AND groupCategory.deletedAt IS NULL',
      )
      .leftJoin(
        GroupApplication,
        'groupApplication',
        'group.id = groupApplication.groupId AND groupApplication.deletedAt IS NULL',
      )
      .leftJoin(
        Comment,
        'comment',
        'groupArticle.id = comment.articleId AND comment.deletedAt IS NULL',
      )
      .leftJoin(Scrap, 'scrap', 'groupArticle.id = scrap.articleId')
      .where('groupArticle.deletedAt IS NULL')
      .groupBy('groupArticle.id');

    if (location) {
      query.andWhere('group.location = :location', { location });
    }

    if (category) {
      query.andWhere('groupCategory.name = :categoryName', {
        categoryName: category,
      });
    }

    if (status) {
      query.andWhere('group.status = :status', { status });
    }

    const count = await query.clone().getCount();
    const result = await query
      .orderBy('groupArticle.id', 'DESC')
      .limit(limit)
      .offset(offset)
      .getRawMany<IGroupArticleSearchResult>();

    return [result, count];
  }

  async getDetailById(id: number) {
    return this.createQueryBuilder('groupArticle')
      .select([
        'groupArticle.id as id',
        'groupArticle.title as title',
        'groupArticle.contents as contents',
        'user.id as userId',
        'user.user_name as userName',
        'user.profile_image as userProfileImage',
        'group.maxCapacity as maxCapacity',
        'group.thumbnail as thumbnail',
        'group.status as status',
        'group.location as location',
        'groupCategory.id as groupCategoryId',
        'groupCategory.name as groupCategoryName',
        'COUNT(DISTINCT scrap.id) as scrapCount',
        'COUNT(DISTINCT comment.id) as commentCount',
        'groupArticle.createdAt as createdAt',
      ])
      .leftJoin(Group, 'group', 'groupArticle.id = group.article_id')
      .leftJoin(
        User,
        'user',
        'groupArticle.userId = user.id AND user.deletedAt IS NULL',
      )
      .leftJoin(
        GroupCategory,
        'groupCategory',
        'groupCategory.id = group.category.id AND groupCategory.deletedAt IS NULL',
      )

      .leftJoin(
        Comment,
        'comment',
        'groupArticle.id = comment.articleId AND comment.deletedAt IS NULL',
      )
      .leftJoin(Scrap, 'scrap', 'groupArticle.id = scrap.articleId')
      .where('groupArticle.id = :id', { id })
      .andWhere('groupArticle.deletedAt IS NULL')
      .groupBy('groupArticle.id')
      .getRawOne<IGroupArticleDetail>();
  }

  async getsByUser({
    limit,
    offset,
    user,
  }: {
    limit: number;
    offset: number;
    user: User;
  }): Promise<[IGroupArticleSearchResult[], number]> {
    const query = this.createQueryBuilder('groupArticle')
      .select([
        'groupArticle.id as id',
        'groupArticle.title as title',
        'groupArticle.createdAt as createdAt',
        'group.maxCapacity as maxCapacity',
        'group.thumbnail as thumbnail',
        'group.status as status',
        'group.location as location',
        'groupCategory.id as groupCategoryId',
        'groupCategory.name as groupCategoryName',
        'COUNT(DISTINCT groupApplication.id) as currentCapacity',
        'COUNT(DISTINCT scrap.id) as scrapCount',
        'COUNT(DISTINCT comment.id) as commentCount',
      ])
      .leftJoin(Group, 'group', 'groupArticle.id = group.article_id')
      .leftJoin(
        GroupCategory,
        'groupCategory',
        'groupCategory.id = group.category.id AND groupCategory.deletedAt IS NULL',
      )
      .leftJoin(
        GroupApplication,
        'groupApplication',
        'group.id = groupApplication.groupId AND groupApplication.deletedAt IS NULL',
      )
      .leftJoin(
        Comment,
        'comment',
        'groupArticle.id = comment.articleId AND comment.deletedAt IS NULL',
      )
      .leftJoin(Scrap, 'scrap', 'groupArticle.id = scrap.articleId')
      .where('groupArticle.deletedAt IS NULL')
      .andWhere('groupArticle.userId = :userId', { userId: user.id })
      .groupBy('groupArticle.id');

    const count = await query.clone().getCount();
    const result = await query
      .orderBy('groupArticle.id', 'DESC')
      .limit(limit)
      .offset(offset)
      .getRawMany<IGroupArticleSearchResult>();

    return [result, count];
  }
}
