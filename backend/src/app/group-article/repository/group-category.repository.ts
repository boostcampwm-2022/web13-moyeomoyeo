import { DataSource, Repository } from 'typeorm';
import { GroupCategory } from '@app/group-article/entity/group-category.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GroupCategoryRepository extends Repository<GroupCategory> {
  constructor(private readonly dataSource: DataSource) {
    super(
      GroupCategory,
      dataSource.createEntityManager(),
      dataSource.createQueryRunner(),
    );
  }
}
