import { Injectable } from '@nestjs/common';
import { GroupApplicationRepository } from '@app/group-application/group-application.repository';
import { GroupApplication } from '@app/group-application/entity/group-application.entity';
import { GROUP_APPLICATION_STATUS } from '@app/group-article/constants/group-article.constants';
import { DuplicateApplicationException } from '@src/app/group-application/exception/duplicate-application.exception';
import { GroupNotFoundException } from '@app/group-application/exception/group-not-found.exception';
import { CannotApplicateException } from '@app/group-application/exception/cannot-applicate.exception';
import { GroupArticleRepository } from '@app/group-article/repository/group-article.repository';
import { GroupArticle } from '@app/group-article/entity/group-article.entity';
import { User } from '@app/user/entity/user.entity';
import { Group } from '@app/group-article/entity/group.entity';

@Injectable()
export class GroupApplicationService {
  constructor(
    private readonly groupApplicationRepository: GroupApplicationRepository,
    private readonly groupArticleRespository: GroupArticleRepository,
  ) {}

  async attendGroup(user: User, groupArticleId: number) {
    const groupArticle = await this.groupArticleRespository.findById(
      groupArticleId,
    );
    await this.validateGroupArticleId(groupArticle);
    this.validateUserTarget(user, groupArticle);
    const group = groupArticle.group;
    await this.validateRegister(user, group);

    const groupApplication = GroupApplication.create(user, group);
    return this.groupApplicationRepository.save(groupApplication);
  }

  async validateGroupArticleId(groupArticle: GroupArticle) {
    if (!groupArticle) {
      throw new GroupNotFoundException();
    }
    return groupArticle;
  }

  validateUserTarget(currentUser: User, groupArticle: GroupArticle) {
    if (groupArticle.isAuthor(currentUser)) {
      throw new CannotApplicateException();
    }
  }

  async validateRegister(user: User, group: Group) {
    const application =
      await this.groupApplicationRepository.findByUserIdAndGroupIdAndStatus(
        user.id,
        group.id,
        GROUP_APPLICATION_STATUS.REGISTER,
      );

    if (application) {
      throw new DuplicateApplicationException();
    }
  }

  async checkJoiningGroup(user: User, groupArticleId: number) {
    const groupArticle = await this.groupArticleRespository.findById(
      groupArticleId,
    );
    await this.validateGroupArticleId(groupArticle);
    const group = groupArticle.group;
    const application =
      await this.groupApplicationRepository.findByUserIdAndGroupIdAndStatus(
        user.id,
        group.id,
        GROUP_APPLICATION_STATUS.REGISTER,
      );

    return groupArticle.isAuthor(user) || application !== null;
  }
}
