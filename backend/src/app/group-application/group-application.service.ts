import { Injectable } from '@nestjs/common';
import { GroupApplicationRepository } from '@app/group-application/group-application.repository';
import { GroupApplication } from '@app/group-application/entity/group-application.entity';
import { GROUP_APPLICATION_STATUS } from '@app/group-article/constants/group-article.constants';
import { DuplicateApplicationException } from '@src/app/group-application/exception/duplicate-application.exception';
import { GroupNotFoundException } from '@app/group-application/exception/group-not-found.exception';
import { CannotApplicateException } from '@app/group-application/exception/cannot-applicate.exception';
import { GroupArticleRepository } from '@app/group-article/repository/group-article.repository';

@Injectable()
export class GroupApplicationService {
  constructor(
    private readonly groupApplicationRepository: GroupApplicationRepository,
    private readonly groupArticleRespository: GroupArticleRepository,
  ) {}

  async attendGroup(userId: number, groupId: number) {
    const groupArticle = await this.validateGroupArticleId(groupId);
    this.validateUserTarget(userId, groupArticle.userId);
    await this.validateRegister(userId, groupId);

    const groupApplication = GroupApplication.create(userId, groupId);
    return this.groupApplicationRepository.save(groupApplication);
  }

  async validateGroupArticleId(groupId: number) {
    const groupArticle = await this.groupArticleRespository.findById(groupId);
    if (!groupArticle) {
      throw new GroupNotFoundException();
    }
    return groupArticle;
  }

  validateUserTarget(currentUserId: number, userId: number) {
    if (currentUserId === userId) {
      throw new CannotApplicateException();
    }
  }

  async validateRegister(userId: number, groupId: number) {
    const application =
      await this.groupApplicationRepository.findByUserIdAndGroupIdAndStatus(
        userId,
        groupId,
        GROUP_APPLICATION_STATUS.REGISTER,
      );

    if (application) {
      throw new DuplicateApplicationException();
    }
  }
}
