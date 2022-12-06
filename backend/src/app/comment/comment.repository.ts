import { DataSource, IsNull, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Comment } from '@app/comment/entity/comment.entity';

@Injectable()
export class CommentRepository extends Repository<Comment> {
  constructor(private readonly dataSource: DataSource) {
    super(
      Comment,
      dataSource.createEntityManager(),
      dataSource.createQueryRunner(),
    );
  }

  getTotalCount(articleId: number) {
    return this.countBy({
      articleId,
      deletedAt: IsNull(),
    });
  }

  selectAllComments({
    limit,
    offset,
    articleId,
  }: {
    limit: number;
    offset: number;
    articleId: number;
  }) {
    return this.find({
      relations: {
        user: true,
      },
      where: {
        articleId,
        deletedAt: IsNull(),
      },
      take: limit,
      skip: offset,
    });
  }

  findById(id: number) {
    return this.findOneBy({ id, deletedAt: IsNull() });
  }

  findByArticleId(groupArticleId: number) {
    return this.findBy({ articleId: groupArticleId, deletedAt: IsNull() });
  }
}
