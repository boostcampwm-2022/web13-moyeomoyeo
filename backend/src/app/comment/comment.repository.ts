import { DataSource, IsNull, Not, Repository } from 'typeorm';
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

  async selectAllComments({
    limit,
    offset,
    articleId,
  }: {
    limit: number;
    offset: number;
    articleId: number;
  }) {
    const [allCommentList, totalCount] = await this.findAndCount({
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

    return { allCommentList, totalCount };
  }

  findById(id: number) {
    return this.findOneBy({ id, deletedAt: IsNull() });
  }

  findByArticleId(currentUserId: number, groupArticleId: number) {
    return this.find({
      relations: { user: true },
      where: {
        articleId: groupArticleId,
        deletedAt: IsNull(),
        userId: Not(currentUserId),
      },
    });
  }
}
