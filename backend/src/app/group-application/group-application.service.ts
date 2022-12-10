import { Injectable } from '@nestjs/common';
import { GroupApplicationRepository } from '@app/group-application/group-application.repository';
import { GroupApplication } from '@app/group-application/entity/group-application.entity';
import {
  GROUP_APPLICATION_STATUS,
  GROUP_STATUS,
} from '@app/group-article/constants/group-article.constants';
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
import { GroupArticleResponse } from '@app/group-application/dto/group-article-response.dto';
import { ClosedGroupException } from '@app/group-application/exception/closed-group.exception';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { GroupSucceedEvent } from '@app/notification/event/group-succeed.event';

@Injectable()
export class GroupApplicationService {
  constructor(
    private readonly groupApplicationRepository: GroupApplicationRepository,
    private readonly groupArticleRepository: GroupArticleRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  private async getGroupApplicationContext(user: User, groupArticleId: number) {
    const groupArticle = await this.groupArticleRepository.findById(
      groupArticleId,
    );
    this.validateGroupArticle(groupArticle);

    const group = groupArticle.group;
    const application = await this.findGroupApplication(user, group);

    return {
      groupArticle,
      group,
      application,
    };
  }

  private validateGroupArticle(groupArticle: GroupArticle) {
    if (!groupArticle) {
      throw new GroupNotFoundException();
    }
  }

  private findGroupApplication(user: User, group: Group) {
    return this.groupApplicationRepository.findByUserIdAndGroupIdAndStatus(
      user.id,
      group.id,
      GROUP_APPLICATION_STATUS.REGISTER,
    );
  }

  public async joinGroup(user: User, groupArticleId: number) {
    const { groupArticle, group, application } =
      await this.getGroupApplicationContext(user, groupArticleId);
    const groupApplicationCount =
      await this.groupApplicationRepository.findApplicationCountByGroup(
        group.id,
      );
    this.validateJoinGroup({
      currentUser: user,
      groupArticle,
      application,
      group,
      groupApplicationCount,
    });

    const groupApplication = GroupApplication.create(user, group);
    const result = await this.groupApplicationRepository.save(groupApplication);
    await this.checkGroupComplete(groupArticle, groupApplicationCount);
    return result;
  }

  private validateJoinGroup({
    currentUser,
    groupArticle,
    application,
    group,
    groupApplicationCount,
  }: {
    currentUser: User;
    groupArticle: GroupArticle;
    application: GroupApplication;
    group: Group;
    groupApplicationCount: number;
  }) {
    if (groupArticle.isAuthor(currentUser)) {
      throw new CannotApplicateException();
    }

    if (application) {
      throw new DuplicateApplicationException();
    }

    if (
      group.maxCapacity <= groupApplicationCount ||
      group.status !== GROUP_STATUS.PROGRESS
    ) {
      throw new ClosedGroupException();
    }
  }

  private async checkGroupComplete(
    groupArticle: GroupArticle,
    groupApplicationCount: number,
  ) {
    if (groupArticle.group.maxCapacity <= groupApplicationCount + 1) {
      groupArticle.group.complete();
      await this.groupArticleRepository.save(groupArticle);
      this.eventEmitter.emit(
        'group.succeed',
        new GroupSucceedEvent(groupArticle),
      );
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
    this.validateForCanceling(user, groupArticle, application);
    await this.deleteApplication(application);
  }

  private validateForCanceling(
    currentUser: User,
    groupArticle: GroupArticle,
    application: GroupApplication,
  ) {
    if (groupArticle.isAuthor(currentUser)) {
      throw new CannotApplicateException();
    }

    if (!application) {
      throw new ApplicationNotFoundException();
    }

    if (application.userId !== currentUser.id) {
      throw new NotAuthorException();
    }

    if (groupArticle.group.status !== GROUP_STATUS.PROGRESS) {
      throw new ClosedGroupException();
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
    const { result, totalCount } =
      await this.groupApplicationRepository.findMyGroup({
        userId: user.id,
        limit,
        offset,
      });
    const response = await Promise.all(
      result.map((value) => GroupArticleResponse.from(value)),
    );
    return { response, totalCount };
  }

  public async getAllParticipants(user: User, groupArticleId: number) {
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
