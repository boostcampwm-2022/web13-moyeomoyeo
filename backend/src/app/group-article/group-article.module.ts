import { Module } from '@nestjs/common';
import { GroupArticleController } from '@app/group-article/group-article.controller';
import { GroupArticleService } from '@app/group-article/group-article.service';
import { GroupCategoryRepository } from '@app/group-article/repository/group-category.repository';
import { GroupRepository } from '@app/group-article/repository/group.repository';
import { GroupArticleRepository } from '@app/group-article/repository/group-article.repository';
import { ImageModule } from '@app/image/image.module';

@Module({
  imports: [ImageModule],
  controllers: [GroupArticleController],
  providers: [
    GroupArticleService,
    GroupRepository,
    GroupCategoryRepository,
    GroupArticleRepository,
  ],
  exports: [GroupRepository],
})
export class GroupArticleModule {}
