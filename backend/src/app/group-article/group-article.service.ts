import { Injectable } from '@nestjs/common';
import { GroupArticleRegisterRequest } from '@app/group-article/dto/group-article-register-request.dto';
import { GroupArticle } from '@app/group-article/entity/group-article.entity';
import { GroupCategoryNotFoundException } from '@src/app/group-article/exception/group-category-not-found.exception';
import { GroupCategoryRepository } from '@app/group-article/repository/group-category.repository';
import { GroupArticleRepository } from '@app/group-article/repository/group-article.repository';
import { User } from '@app/user/entity/user.entity';

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
}
