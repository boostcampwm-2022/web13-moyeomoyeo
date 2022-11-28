import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { GroupArticle } from '../entity/group-article.entity';

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
