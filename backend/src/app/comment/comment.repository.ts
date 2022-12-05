import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Comment } from '@app/comment/entity/comment.entity';

@Injectable()
export class CommnetRepository extends Repository<Comment> {
  constructor(private readonly dataSource: DataSource) {
    super(
      Comment,
      dataSource.createEntityManager(),
      dataSource.createQueryRunner(),
    );
  }
}
