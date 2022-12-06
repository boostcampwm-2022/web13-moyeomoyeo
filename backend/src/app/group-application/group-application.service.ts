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
import { ApplicationWithUserInfoResponse } from '@src/app/group-application/dto/application-with-user-info-response.dto';

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
    this.validateRegisterForJoining(application);

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

  private validateRegisterForJoining(application: GroupApplication) {
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
    this.validateRegisterForCanceling(application);

    await this.deleteApplication(application);
  }

  private validateRegisterForCanceling(application: GroupApplication) {
    if (!application) {
      throw new ApplicationNotFoundException();
    }
  }

  private async deleteApplication(application: GroupApplication) {
    application.cancel();
    await this.groupApplicationRepository.save(application);
  }

  public async findMyGroup({
    user,
    limit,
    offset,
  }: {
    user: User;
    limit: number;
    offset: number;
  }) {
    const result = await this.groupApplicationRepository.findMyGroup({
      userId: user.id,
      limit,
      offset,
    });
    const count = await this.groupApplicationRepository.findMyGroupCount(
      user.id,
    );
    return { result, count };
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

    return Promise.all(applicationWithUserInfoList);
  }
}
