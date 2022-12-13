import { Module } from '@nestjs/common';
import { GroupArticleController } from '@app/group-article/group-article.controller';
import { GroupArticleService } from '@app/group-article/group-article.service';
import { GroupCategoryRepository } from '@app/group-article/repository/group-category.repository';
import { GroupArticleRepository } from '@app/group-article/repository/group-article.repository';
import { MyGroupArticleController } from '@app/group-article/my-group-article.controller';
import { MyGroupArticleService } from '@app/group-article/my-group-article.service';

@Module({
  controllers: [GroupArticleController, MyGroupArticleController],
  providers: [
    GroupArticleService,
    GroupCategoryRepository,
    GroupArticleRepository,
    MyGroupArticleService,
  ],
  exports: [GroupArticleRepository],
})
export class GroupArticleModule {}
