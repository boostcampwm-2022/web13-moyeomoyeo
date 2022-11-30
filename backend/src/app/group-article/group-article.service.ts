import { Injectable } from '@nestjs/common';
import { DataSource, IsNull } from 'typeorm';
import { GroupArticleRegisterRequest } from '@app/group-article/dto/group-article-register-request.dto';
import { GroupArticle } from '@app/group-article/entity/group-article.entity';
import { GroupCategoryNotFoundException } from '@src/app/group-article/exception/group-category-not-found.exception';
import { GroupCategoryRepository } from '@app/group-article/repository/group-category.repository';
import { GroupArticleRepository } from '@app/group-article/repository/group-article.repository';
import { User } from '@app/user/entity/user.entity';
import { GroupArticleNotFoundException } from '@app/group-article/exception/group-article-not-found.exception';
import { UpdateGroupArticleRequest } from '@app/group-article/dto/update-group-article-request.dto';
import { GroupApplication } from '@app/group-application/entity/group-application.entity';
import {
  GROUP_APPLICATION_STATUS,
  GROUP_STATUS,
} from '@app/group-article/constants/group-article.constants';
import { NotParticipantException } from '@app/group-article/exception/not-participant.exception';
import { NotSuccessGroupException } from '@app/group-article/exception/not-success-group.exception';

@Injectable()
export class GroupArticleService {
  constructor(
    private readonly groupArticleRepository: GroupArticleRepository,
    private readonly groupCategoryRepository: GroupCategoryRepository,
    private readonly dataSource: DataSource,
  ) {}

  async registerGroupArticle(
    user: User,
    groupArticleRegisterRequest: GroupArticleRegisterRequest,
  ) {
    const category = await this.groupCategoryRepository.findByCategoryName(
      groupArticleRegisterRequest.category,
    );

    if (!category) {
      throw new GroupCategoryNotFoundException();
    }

    const groupArticle = GroupArticle.create(user, {
      title: groupArticleRegisterRequest.title,
      contents: groupArticleRegisterRequest.contents,
      thumbnail: groupArticleRegisterRequest.thumbnail,
      location: groupArticleRegisterRequest.location,
      maxCapacity: groupArticleRegisterRequest.maxCapacity,
      chatUrl: groupArticleRegisterRequest.chatUrl,
      category,
    });

    await this.groupArticleRepository.save(groupArticle);

    return groupArticle;
  }

  async remove(user: User, id: number) {
    const groupArticle = await this.groupArticleRepository.findOneBy({
      id,
      deletedAt: IsNull(),
    });
    if (!groupArticle) {
      throw new GroupArticleNotFoundException();
    }

    groupArticle.remove(user);

    await this.groupArticleRepository.save(groupArticle, { reload: false });
  }

  async complete(user: User, id: number) {
    const groupArticle = await this.groupArticleRepository.findOneBy({
      id,
      deletedAt: IsNull(),
    });

    if (!groupArticle) {
      throw new GroupArticleNotFoundException();
    }

    groupArticle.complete(user);

    await this.groupArticleRepository.save(groupArticle, { reload: false });

    // TODO: 알림 추가 및 알림 발송
  }

  async cancel(user: User, id: number) {
    const groupArticle = await this.groupArticleRepository.findOneBy({
      id,
      deletedAt: IsNull(),
    });

    if (!groupArticle) {
      throw new GroupArticleNotFoundException();
    }

    groupArticle.cancel(user);

    await this.groupArticleRepository.save(groupArticle, { reload: false });

    // TODO: 알림 추가 및 알림 발송
  }

  async getDetailById(id: number) {
    const groupArticleDetail = await this.groupArticleRepository.getDetailById(
      id,
    );
    if (!groupArticleDetail) {
      throw new GroupArticleNotFoundException();
    }

    return groupArticleDetail;
  }

  async update(
    user: User,
    id: number,
    { title, contents, thumbnail, chatUrl }: UpdateGroupArticleRequest,
  ) {
    const groupArticle = await this.groupArticleRepository.findOneBy({
      id,
      deletedAt: IsNull(),
    });

    if (!groupArticle) {
      throw new GroupArticleNotFoundException();
    }

    groupArticle.update(user, {
      title,
      contents,
      thumbnail,
      chatUrl,
    });

    await this.groupArticleRepository.save(groupArticle, { reload: false });
  }

  async getChatUrl(user: User, id: number) {
    const groupArticle = await this.groupArticleRepository.findOneBy({
      id,
      deletedAt: IsNull(),
    });

    if (!groupArticle) {
      throw new GroupArticleNotFoundException();
    }

    if (groupArticle.group.status !== GROUP_STATUS.SUCCEED) {
      throw new NotSuccessGroupException();
    }
    const groupApplication = await this.dataSource
      .getRepository(GroupApplication)
      .findOneBy({
        userId: user.id,
        groupId: groupArticle.group.id,
        status: GROUP_APPLICATION_STATUS.REGISTER,
      });

    if (!groupApplication) {
      throw new NotParticipantException();
    }

    return groupArticle.group.chatUrl;
  }
}
