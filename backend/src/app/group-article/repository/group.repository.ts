import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Group } from '@app/group-article/entity/group.entity';

@Injectable()
export class GroupRepository extends Repository<Group> {
  constructor(private readonly dataSource: DataSource) {
    super(
      Group,
      dataSource.createEntityManager(),
      dataSource.createQueryRunner(),
    );
  }

  findById(id: number) {
    return this.findOneBy({ id });
  }
}
