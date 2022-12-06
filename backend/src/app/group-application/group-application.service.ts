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
import { UserInfo } from '@app/group-application/dto/user-info.dto';
import { ApplicationWithUserInfoResponse } from '@app/group-application/dto/application-with-user-info-response.dto';
import { NotAuthorException } from '@app/group-application/exception/not-author.exception';

@Injectable()
export class GroupApplicationService {
  constructor(
    private readonly groupApplicationRepository: GroupApplicationRepository,
    private readonly groupArticleRepository: GroupArticleRepository,
  ) {}

  private async getGroupApplicationContext(user: User, groupArticleId: number) {
    const groupArticle = await this.groupArticleRepository.findById(
      groupArticleId,
    );
    await this.validateGroupArticle(groupArticle);

    const group = groupArticle.group;
    const application = await this.findGroupApplication(user, group);

    return {
      groupArticle,
      group,
      application,
    };
  }

  private async findGroupApplication(user: User, group: Group) {
    return this.groupApplicationRepository.findByUserIdAndGroupIdAndStatus(
      user.id,
      group.id,
      GROUP_APPLICATION_STATUS.REGISTER,
    );
  }

  public async joinGroup(user: User, groupArticleId: number) {
    const { groupArticle, group, application } =
      await this.getGroupApplicationContext(user, groupArticleId);

    this.validateUserTarget(user, groupArticle);
    await this.validateRegisterForJoining(application);

    const groupApplication = GroupApplication.create(user, group);
    return this.groupApplicationRepository.save(groupApplication);
  }

  private async validateGroupArticle(groupArticle: GroupArticle) {
    if (!groupArticle) {
      throw new GroupNotFoundException();
    }
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

  public async checkJoinedGroup(user: User, groupArticleId: number) {
    const { groupArticle, application } = await this.getGroupApplicationContext(
      user,
      groupArticleId,
    );

    return groupArticle.isAuthor(user) || application !== null;
  }

  public async cancelJoinedGroup(user: User, groupArticleId: number) {
    const { groupArticle, application } = await this.getGroupApplicationContext(
      user,
      groupArticleId,
    );

    this.validateUserTarget(user, groupArticle);
    await this.validateRegisterForCanceling(user, application);

    await this.deleteApplication(application);
  }

  private async validateRegisterForCanceling(
    user: User,
    application: GroupApplication,
  ) {
    if (!application) {
      throw new ApplicationNotFoundException();
    }

    if (application.userId !== user.id) {
      throw new NotAuthorException();
    }
  }

  private async deleteApplication(application: GroupApplication) {
    application.cancel();
    await this.groupApplicationRepository.save(application);
  }

  async getAllParticipants(user: User, groupArticleId: number) {
    const { group } = await this.getGroupApplicationContext(
      user,
      groupArticleId,
    );

    return this.getApplicationWithUserInfo(group);
  }

  private async getApplicationWithUserInfo(group: Group) {
    const allApplication =
      await this.groupApplicationRepository.findAllApplicationByGroupWithUser(
        group.id,
      );

    const applicationWithUserInfoList = allApplication.map(
      async (application) => {
        const user = await application.user;
        return ApplicationWithUserInfoResponse.from(
          UserInfo.from(user),
          application,
        );
      },
    );

    return await Promise.all(applicationWithUserInfoList);
  }
}
