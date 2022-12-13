import { DataSource, IsNull, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { GroupCategory } from '@app/group-article/entity/group-category.entity';

@Injectable()
export class GroupCategoryRepository extends Repository<GroupCategory> {
  constructor(private readonly dataSource: DataSource) {
    const baseRepository = dataSource.getRepository(GroupCategory);
    super(
      baseRepository.target,
      baseRepository.manager,
      baseRepository.queryRunner,
    );
  }

  findByCategoryName(categoryName: string) {
    return this.findOne({
      select: {
        id: true,
      },
      where: {
        name: categoryName,
        deletedAt: IsNull(),
      },
    });
  }
}
