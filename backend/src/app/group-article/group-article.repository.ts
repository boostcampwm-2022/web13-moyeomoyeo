import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { GroupArticle } from '@app/group-article/entity/group-article.entity';

@Injectable()
export class GroupArticleRepository extends Repository<GroupArticle> {
  constructor(private readonly dataSource: DataSource) {
    super(
      GroupArticle,
      dataSource.createEntityManager(),
      dataSource.createQueryRunner(),
    );
  }
}
