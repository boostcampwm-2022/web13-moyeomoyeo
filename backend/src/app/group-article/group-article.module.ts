import { Module } from '@nestjs/common';
import { GroupCategoryRepository } from '@app/group-article/repository/group-category.repository';
import { GroupArticleController } from '@app/group-article/group-article.controller';

@Module({
  controllers: [GroupArticleController],
  providers: [GroupCategoryRepository],
})
export class GroupArticleModule {}
