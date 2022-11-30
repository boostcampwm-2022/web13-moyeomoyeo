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
import { ApplicationNotFoundException } from '@app/group-application/exception/application-not-found.exception';

@Injectable()
export class GroupApplicationService {
  constructor(
    private readonly groupApplicationRepository: GroupApplicationRepository,
    private readonly groupArticleRespository: GroupArticleRepository,
  ) {}

  private async getAttribute(user: User, groupArticleId: number) {
    const groupArticle = await this.groupArticleRespository.findById(
      groupArticleId,
    );
    const group = groupArticle.group;
    const application = await this.findGroupApplication(user, group);

    return {
      groupArticle,
      group,
      application,
    };
  }

  public async attendGroup(user: User, groupArticleId: number) {
    const { groupArticle, group, application } = await this.getAttribute(
      user,
      groupArticleId,
    );
    await this.validateGroupArticle(groupArticle);
    this.validateUserTarget(user, groupArticle);
    await this.validateRegisterForJoining(application);

    const groupApplication = GroupApplication.create(user, group);
    return this.groupApplicationRepository.save(groupApplication);
  }

  private async findGroupApplication(user: User, group: Group) {
    return await this.groupApplicationRepository.findByUserIdAndGroupIdAndStatus(
      user.id,
      group.id,
      GROUP_APPLICATION_STATUS.REGISTER,
    );
  }

  private async validateGroupArticle(groupArticle: GroupArticle) {
    if (!groupArticle) {
      throw new GroupNotFoundException();
    }
    return groupArticle;
  }

  private validateUserTarget(currentUser: User, groupArticle: GroupArticle) {
    if (groupArticle.isAuthor(currentUser)) {
      throw new CannotApplicateException();
    }
  }

  private async validateRegisterForJoining(application: GroupApplication) {
    if (application) {
      throw new DuplicateApplicationException();
    }
  }

  public async checkJoiningGroup(user: User, groupArticleId: number) {
    const { groupArticle, application } = await this.getAttribute(
      user,
      groupArticleId,
    );

    await this.validateGroupArticle(groupArticle);

    return groupArticle.isAuthor(user) || application !== null;
  }

  public async cancelJoining(user: User, groupArticleId: number) {
    const { groupArticle, application } = await this.getAttribute(
      user,
      groupArticleId,
    );

    await this.validateGroupArticle(groupArticle);
    this.validateUserTarget(user, groupArticle);
    await this.validateRegisterForCanceling(application);

    this.deleteApplication(application);
  }

  private async validateRegisterForCanceling(application: GroupApplication) {
    if (!application) {
      throw new ApplicationNotFoundException();
    }
  }

  private deleteApplication(application: GroupApplication) {
    application.cancel();
    this.groupApplicationRepository.save(application);
  }
}
