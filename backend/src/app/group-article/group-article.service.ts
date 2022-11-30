import { Injectable } from '@nestjs/common';
import { IsNull } from 'typeorm';
import { GroupArticleRegisterRequest } from '@app/group-article/dto/group-article-register-request.dto';
import { GroupArticle } from '@app/group-article/entity/group-article.entity';
import { GroupCategoryNotFoundException } from '@src/app/group-article/exception/group-category-not-found.exception';
import { GroupCategoryRepository } from '@app/group-article/repository/group-category.repository';
import { GroupArticleRepository } from '@app/group-article/repository/group-article.repository';
import { User } from '@app/user/entity/user.entity';
import { GroupArticleNotFoundException } from '@app/group-article/exception/group-article-not-found.exception';
import { UpdateGroupArticleRequest } from '@app/group-article/dto/update-group-article-request.dto';

@Injectable()
export class GroupArticleService {
  constructor(
    private readonly groupArticleRepository: GroupArticleRepository,
    private readonly groupCategoryRepository: GroupCategoryRepository,
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
}
