import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { GroupApplication } from '@app/group-application/entity/group-application.entity';
import { GROUP_APPLICATION_STATUS } from '@app/group-article/constants/group-article.constants';

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
    status: GROUP_APPLICATION_STATUS | null,
  ) {
    return this.findOneBy({ userId, groupId, status });
  }
}
