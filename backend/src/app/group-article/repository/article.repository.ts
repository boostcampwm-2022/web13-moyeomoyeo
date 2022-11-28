import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Article } from '../entity/article.entity';

@Injectable()
export class ArticleRepository extends Repository<Article> {
  constructor(private readonly dataSource: DataSource) {
    super(
      Article,
      dataSource.createEntityManager(),
      dataSource.createQueryRunner(),
    );
  }

  registerArticle({
    title,
    contents,
    type,
    thumbnail,
  }: {
    title: string;
    contents: string;
    type: string;
    thumbnail: string;
  }) {
    return this.insert(
      Article.register({
        title,
        contents,
        type,
        thumbnail,
      }),
    );
  }
}
