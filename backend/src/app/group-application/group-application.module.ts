import { Module } from '@nestjs/common';
import { GroupApplicationController } from '@app/group-application/group-application.controller';
import { GroupApplicationRepository } from '@app/group-application/group-application.repository';
import { GroupApplicationService } from '@app/group-application/group-application.service';
import { GroupArticleModule } from '@app/group-article/group-article.module';

@Module({
  imports: [GroupArticleModule],
  controllers: [GroupApplicationController],
  providers: [GroupApplicationService, GroupApplicationRepository],
  exports: [GroupApplicationRepository],
})
export class GroupApplicationModule {}
