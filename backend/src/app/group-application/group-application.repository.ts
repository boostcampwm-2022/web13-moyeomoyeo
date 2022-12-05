import { Injectable } from '@nestjs/common';
import { DataSource, IsNull, Repository } from 'typeorm';
import { GroupApplication } from '@app/group-application/entity/group-application.entity';
import { GROUP_APPLICATION_STATUS } from '@app/group-article/constants/group-article.constants';
import { GroupArticle } from '@app/group-article/entity/group-article.entity';

@Injectable()
export class GroupApplicationRepository extends Repository<GroupApplication> {
  constructor(private readonly dataSource: DataSource) {
    super(
      GroupApplication,
      dataSource.createEntityManager(),
      dataSource.createQueryRunner(),
    );
  }

  findByUserIdAndGroupIdAndStatus(
    userId: number,
    groupId: number,
    status: GROUP_APPLICATION_STATUS,
  ) {
    return this.findOneBy({ userId, groupId, status });
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
