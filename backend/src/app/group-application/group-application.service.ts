import { Injectable } from '@nestjs/common';
import { GroupApplicationRepository } from '@app/group-application/group-application.repository';
import { GroupRepository } from '@app/group-article/repository/group.repository';
import { GroupApplication } from '@app/group-application/entity/group-application.entity';
import { GROUP_APPLICATION_STATUS } from '@app/group-article/constants/group-article.constants';
import { DuplicateApplicationException } from '@src/app/group-application/exception/duplicate-application.exception';
import { GroupNotFoundException } from '@app/group-application/exception/group-not-found.exception';
import { CannotApplicateException } from './exception/cannot-applicate.exception';

@Injectable()
export class GroupApplicationService {
  constructor(
    private readonly groupApplicationRepository: GroupApplicationRepository,
    private readonly groupRespository: GroupRepository,
  ) {}

  async attendGroup(userId: number, groupId: number) {
    await this.validateRegister(userId, groupId);
    const article = await this.validateGroupId(groupId);
    this.validateUserTarget(userId, article.userId);

    const groupApplication = GroupApplication.create(userId, groupId);
    return this.groupApplicationRepository.save(groupApplication);
  }

  async validateGroupId(groupId: number) {
    const group = await this.groupRespository.findById(groupId);
    if (!group) {
      throw new GroupNotFoundException();
    }
    return group.article;
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
