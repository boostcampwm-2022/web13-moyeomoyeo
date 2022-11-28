import { Module } from '@nestjs/common';
import { GroupArticleController } from './group-article.controller';
import { GroupArticleService } from './group-article.service';
import { ArticleRepository } from './repository/article.repository';
import { GroupCategoryRepository } from './repository/group-category.repository';
import { GroupRepository } from './repository/group.repository';

@Module({
  imports: [],
  controllers: [GroupArticleController],
  providers: [
    GroupArticleService,
    GroupRepository,
    ArticleRepository,
    GroupCategoryRepository,
  ],
})
export class GroupArticleModule {}
