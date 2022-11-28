import { Module } from '@nestjs/common';
import { JwtTokenModule } from '@src/common/module/jwt-token/jwt-token.module';
import { GroupArticleController } from '@app/group-article/group-article.controller';
import { GroupArticleService } from '@app/group-article/group-article.service';
import { GroupCategoryRepository } from '@app/group-article/repository/group-category.repository';
import { GroupRepository } from '@app/group-article/repository/group.repository';
import { GroupArticleRepository } from '@app/group-article/repository/group-article.repository';

@Module({
  imports: [JwtTokenModule],
  controllers: [GroupArticleController],
  providers: [
    GroupArticleService,
    GroupRepository,
    GroupCategoryRepository,
    GroupArticleRepository,
  ],
})
export class GroupArticleModule {}
