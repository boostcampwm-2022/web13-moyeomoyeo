import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { GroupArticle } from '@app/group-article/entity/group-article.entity';
import { Group } from '@app/group-article/entity/group.entity';
import { GroupCategory } from '@app/group-article/entity/group-category.entity';
import { GroupApplication } from '@app/group-application/entity/group-application.entity';
import { Scrap } from '@app/scrap/entity/scrap.entity';
import { Comment } from '@app/comment/entity/comment.entity';

@Injectable()
export class GroupArticleRepository extends Repository<GroupArticle> {
  constructor(private readonly dataSource: DataSource) {
    super(
      GroupArticle,
      dataSource.createEntityManager(),
      dataSource.createQueryRunner(),
    );
  }

  search({
    limit,
    nextId,
    location,
    categoryId,
    status,
  }: {
    limit: number;
    nextId: number;
    location?: string;
    categoryId?: number;
    status?: string;
  }) {
    const query = this.createQueryBuilder('groupArticle')
      .select([
        'groupArticle.id',
        'groupArticle.title',
        'groupArticle.createdAt',
        'group.maxCapacity',
        'group.thumbnail',
        'group.status',
        'group.location',
        'groupCategory.id',
        'groupCategory.name',
        'COUNT(DISTINCT groupApplication.id) as currentCapacity',
        'COUNT(DISTINCT scrap.id) as scrapCount',
        'COUNT(DISTINCT comment.id) as commentCount',
      ])
      .leftJoin(Group, 'group', 'groupArticle.id = group.articleId')
      .leftJoin(
        GroupCategory,
        'groupCategory',
        'groupCategory.id = group.category.id AND groupCategory.deletedAt IS NULL',
      )
      .leftJoin(
        GroupApplication,
        'groupApplication',
        'group.id = groupApplication.groupId',
      )
      .leftJoin(
        Comment,
        'comment',
        'groupArticle.id = comment.articleId AND comment.deletedAt IS NULL',
      )
      .leftJoin(Scrap, 'scrap', 'groupArticle.id = scrap.articleId')
      .where('groupArticle.id < :nextId', { nextId })
      .andWhere('groupArticle.deletedAt IS NULL')
      .groupBy('groupArticle.id')
      .orderBy('groupArticle.id DESC')
      .take(limit);

    if (location) {
      query.where('group.location = :location', {
        location,
      });
    }

    if (categoryId) {
      query.where('group.categoryId = :categoryId', { categoryId });
    }

    if (status) {
      query.where('group.status = :status', { status });
    }

    return query.getRawMany();
  }
}
