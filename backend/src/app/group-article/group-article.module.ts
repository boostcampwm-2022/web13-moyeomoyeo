import { Module } from '@nestjs/common';
import { JwtTokenModule } from '@src/common/module/jwt-token/jwt-token.module';
import { GroupArticleController } from './group-article.controller';
import { GroupArticleService } from './group-article.service';
import { GroupArticleRepository } from './repository/article.repository';
import { GroupCategoryRepository } from './repository/group-category.repository';
import { GroupRepository } from './repository/group.repository';

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
