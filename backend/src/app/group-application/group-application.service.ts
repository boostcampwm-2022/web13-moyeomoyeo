import { Injectable } from '@nestjs/common';
import { GroupApplicationRepository } from '@app/group-application/group-application.repository';
import { GroupApplication } from '@app/group-application/entity/group-application.entity';
import { GROUP_APPLICATION_STATUS } from '@app/group-article/constants/group-article.constants';
import { DuplicateApplicationException } from '@src/app/group-application/exception/duplicate-application.exception';
import { GroupNotFoundException } from '@app/group-application/exception/group-not-found.exception';
import { CannotApplicateException } from '@app/group-application/exception/cannot-applicate.exception';
import { GroupArticleRepository } from '@app/group-article/repository/group-article.repository';
import { GroupArticle } from '../group-article/entity/group-article.entity';

@Injectable()
export class GroupApplicationService {
  constructor(
    private readonly groupApplicationRepository: GroupApplicationRepository,
    private readonly groupArticleRespository: GroupArticleRepository,
  ) {}

  async attendGroup(userId: number, groupArticleId: number) {
    const groupArticle = await this.validateGroupArticleId(groupArticleId);
    this.validateUserTarget(userId, groupArticle.userId);
    const groupId = groupArticle.group.id;
    await this.validateRegister(userId, groupId);

    const groupApplication = GroupApplication.create(userId, groupId);
    return this.groupApplicationRepository.save(groupApplication);
  }

  async validateGroupArticleId(groupArticleId: number) {
    const groupArticle = await this.groupArticleRespository.findById(
      groupArticleId,
    );
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
    if (this.checkApplication(userId, groupId)) {
      throw new DuplicateApplicationException();
    }
  }

  async checkApplication(userId: number, groupId: number) {
    const application =
      await this.groupApplicationRepository.findByUserIdAndGroupIdAndStatus(
        userId,
        groupId,
        GROUP_APPLICATION_STATUS.REGISTER,
      );

    return application !== null;
  }

  async checkJoiningGroup(userId: number, groupArticleId: number) {
    const groupArticle = await this.validateGroupArticleId(groupArticleId);
    const groupId = groupArticle.group.id;

    return (
      (await this.checkAuthor(userId, groupArticle)) ||
      (await this.checkApplication(userId, groupId))
    );
  }

  async checkAuthor(userId: number, groupArticle: GroupArticle) {
    const author = (await groupArticle.user).id;
    if (userId === author) {
      return true;
    }
    return false;
  }
}
