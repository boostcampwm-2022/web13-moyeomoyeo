import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { GroupCategory } from '@app/group-article/entity/group-category.entity';

@Injectable()
export class GroupCategoryRepository extends Repository<GroupCategory> {
  constructor(private readonly dataSource: DataSource) {
    super(
      GroupCategory,
      dataSource.createEntityManager(),
      dataSource.createQueryRunner(),
    );
  }

  findByCategoryName(categoryName: string) {
    return this.findOne({
      select: {
        id: true,
      },
      where: {
        name: categoryName,
      },
    });
  }
}
