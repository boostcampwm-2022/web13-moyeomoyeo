import { Injectable } from '@nestjs/common';
import { DataSource, IsNull, Repository } from 'typeorm';
import { GroupApplication } from '@app/group-application/entity/group-application.entity';
import { GROUP_APPLICATION_STATUS } from '@app/group-article/constants/group-article.constants';
import { Group } from '@app/group-article/entity/group.entity';
import { GroupCategory } from '@app/group-article/entity/group-category.entity';
import { Scrap } from '@app/scrap/entity/scrap.entity';
import { Comment } from '@app/comment/entity/comment.entity';
import { GroupArticle } from '@app/group-article/entity/group-article.entity';
import { IMyGroupResult } from '@app/group-application/dto/my-group-result.interface';
import { IMyApplicationResult } from '@app/group-application/dto/my-application-result.interface';

@Injectable()
export class GroupApplicationRepository extends Repository<GroupApplication> {
  constructor(private readonly dataSource: DataSource) {
    const baseRepository = dataSource.getRepository(GroupApplication);
    super(
      baseRepository.target,
      baseRepository.manager,
      baseRepository.queryRunner,
    );
  }

  findByUserIdAndGroupIdAndStatus(
    userId: number,
    groupId: number,
    status: GROUP_APPLICATION_STATUS,
  ) {
    return this.findOneBy({ userId, groupId, status });
  }

  findApplicationCountByGroup(groupId: number) {
    return this.countBy({ groupId, deletedAt: IsNull() });
  }

  async findMyGroup({
    userId,
    limit,
    offset,
  }: {
    userId: number;
    limit: number;
    offset: number;
  }) {
    const groupApplicationsQuery = this.createQueryBuilder('groupApplication')
      .select([
        'groupApplication.id as id',
        'groupApplication.groupId as groupId',
      ])
      .leftJoin(Group, 'group', 'groupApplication.group_id = group.id')
      .leftJoin(
        GroupArticle,
        'groupArticle',
        'groupArticle.id = group.article_id',
      )
      .where('groupApplication.deletedAt IS NULL')
      .andWhere('groupApplication.user_id = :id', { id: userId })
      .andWhere('groupArticle.deletedAt IS NULL');

    const totalCount = await groupApplicationsQuery.clone().getCount();
    const groupApplications = await groupApplicationsQuery
      .limit(limit)
      .offset(offset)
      .getRawMany<IMyApplicationResult>();

    if (groupApplications.length < 1) {
      return {
        result: [],
        totalCount,
      };
    }

    const result = await this.createQueryBuilder('groupApplication')
      .select([
        'groupArticle.id as groupArticleId',
        'groupArticle.title as title',
        'group.location as location',
        'groupCategory.name as category',
        'COUNT(DISTINCT comment.id) as commentCount',
        'COUNT(DISTINCT scrap.id) as scrapCount',
        'group.thumbnail as thumbnail',
        'group.maxCapacity as maxCapacity',
        'COUNT(DISTINCT groupApplication.id) as currentCapacity',
        'group.status as status',
        'groupArticle.createdAt as createdAt',
      ])
      .leftJoin(Group, 'group', 'groupApplication.group_id = group.id')
      .leftJoin(
        GroupCategory,
        'groupCategory',
        'groupCategory.id = group.category.id AND groupCategory.deletedAt IS NULL',
      )
      .leftJoin(
        GroupArticle,
        'groupArticle',
        'groupArticle.id = group.article_id',
      )
      .leftJoin(
        Comment,
        'comment',
        'groupArticle.id = comment.articleId AND comment.deletedAt IS NULL',
      )
      .leftJoin(Scrap, 'scrap', 'groupArticle.id = scrap.articleId')
      .where('groupArticle.deletedAt IS NULL')
      .andWhere('group.id IN (:...ids)', {
        ids: groupApplications.map(
          (groupApplication) => groupApplication.groupId,
        ),
      })
      .groupBy('group.id')
      .orderBy('group.id', 'DESC')
      .getRawMany<IMyGroupResult>();

    return { result, totalCount };
  }

  findAllApplicationByGroupWithUser(groupId: number) {
    return this.find({
      relations: {
        user: true,
      },
      where: {
        groupId,
        status: GROUP_APPLICATION_STATUS.REGISTER,
      },
    });
  }

  findGroupApplications(groupArticle: GroupArticle) {
    return this.findBy({
      groupId: groupArticle.group.id,
      status: GROUP_APPLICATION_STATUS.REGISTER,
      deletedAt: IsNull(),
    });
  }
}
