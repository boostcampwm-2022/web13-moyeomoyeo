import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Group } from '../entity/group.entity';
import { GroupCategory } from '../entity/group-category.entity';

@Injectable()
export class GroupRepository extends Repository<Group> {
  constructor(private readonly dataSource: DataSource) {
    super(
      Group,
      dataSource.createEntityManager(),
      dataSource.createQueryRunner(),
    );
  }

  registerGroup({
    location,
    maxCapacity,
    chatUrl,
    articleId,
    category,
  }: {
    location: string;
    maxCapacity: number;
    chatUrl: string;
    articleId: number;
    category: GroupCategory;
  }) {
    return this.insert(
      Group.register({
        location,
        maxCapacity,
        chatUrl,
        articleId,
        category,
      }),
    );
  }
}
