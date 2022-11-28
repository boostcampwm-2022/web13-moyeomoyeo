import { Injectable } from '@nestjs/common';
import { GroupArticleRegisterResquest } from '@app/group-article/dto/group-article-register-request.dto';
import { GroupArticle } from '@app/group-article/entity/group-article.entity';
import { GroupCategoryNotFound } from '@app/group-article/exception/group-category-not-found';
import { GroupArticleRepository } from '@app/group-article/repository/article.repository';
import { GroupCategoryRepository } from '@app/group-article/repository/group-category.repository';

@Injectable()
export class GroupArticleService {
  constructor(
    private readonly groupArticleRepository: GroupArticleRepository,
    private readonly groupCategoryRepository: GroupCategoryRepository,
  ) {}

  async registerGroupArticle(
    groupArticleRegisterResquest: GroupArticleRegisterResquest,
  ) {
    const category = await this.groupCategoryRepository.findByCategoryName(
      groupArticleRegisterResquest.category,
    );
    if (!category) {
      throw new GroupCategoryNotFound();
    }

    const groupArticle = GroupArticle.register({
      title: groupArticleRegisterResquest.title,
      contents: groupArticleRegisterResquest.contents,
      thumbnail: groupArticleRegisterResquest.thumbnail,
      location: groupArticleRegisterResquest.location,
      maxCapacity: groupArticleRegisterResquest.maxCapacity,
      chatUrl: groupArticleRegisterResquest.chatUrl,
      category: category,
    });
    return this.groupArticleRepository.save(groupArticle);
  }
}
