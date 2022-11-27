import { Module } from '@nestjs/common';
import { GroupArticleController } from '@app/group-article/group-article.controller';
import { GroupArticleService } from '@app/group-article/group-article.service';
import { GroupArticleRepository } from '@app/group-article/group-article.repository';

@Module({
  controllers: [GroupArticleController],
  providers: [GroupArticleService, GroupArticleRepository],
})
export class GroupArticleModule {}
