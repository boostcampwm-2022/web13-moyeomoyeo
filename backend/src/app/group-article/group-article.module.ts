import { Module } from '@nestjs/common';
import { JwtTokenModule } from '@src/common/module/jwt-token/jwt-token.module';
import { GroupArticleController } from '@app/group-article/group-article.controller';
import { GroupArticleService } from '@app/group-article/group-article.service';
import { GroupArticleRepository } from '@app/group-article/repository/article.repository';
import { GroupCategoryRepository } from '@app/group-article/repository/group-category.repository';
import { GroupRepository } from '@app/group-article/repository/group.repository';

@Module({
  imports: [JwtTokenModule],
  controllers: [GroupArticleController],
  providers: [
    GroupArticleService,
    GroupRepository,
    GroupArticleRepository,
    GroupCategoryRepository,
  ],
})
export class GroupArticleModule {}
