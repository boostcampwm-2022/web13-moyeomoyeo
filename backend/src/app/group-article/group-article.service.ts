import { Injectable, Logger } from '@nestjs/common';
import { ARTICLE } from './constants/group-article.constants';
import { GroupArticleRegisterResquest } from './dto/group-article-register-request.dto';
import { GroupCategoryNotFound } from './exception/group-category-not-found';
import { ArticleRepository } from './repository/article.repository';
import { GroupCategoryRepository } from './repository/group-category.repository';
import { GroupRepository } from './repository/group.repository';

@Injectable()
export class GroupArticleService {
  private readonly logger = new Logger(GroupArticleService.name);

  constructor(
    private readonly groupRepository: GroupRepository,
    private readonly articleRepository: ArticleRepository,
    private readonly groupCategoryRepository: GroupCategoryRepository,
  ) {}

  async registerArticle(
    groupArticleRegisterResquest: GroupArticleRegisterResquest,
    type: ARTICLE,
  ) {
    return this.articleRepository.registerArticle({
      title: groupArticleRegisterResquest.title,
      contents: groupArticleRegisterResquest.contents,
      type: type,
      thumbnail: groupArticleRegisterResquest.thumbnail,
    });
  }

  async registerGroup(
    groupArticleRegisterResquest: GroupArticleRegisterResquest,
    articleId: number,
  ) {
    const category = await this.groupCategoryRepository.findByCategoryName(
      groupArticleRegisterResquest.category,
    );
    if (category === null) throw new GroupCategoryNotFound();

    return this.groupRepository.registerGroup({
      location: groupArticleRegisterResquest.location,
      maxCapacity: groupArticleRegisterResquest.maxCapacity,
      chatUrl: groupArticleRegisterResquest.chatUrl,
      articleId,
      category: category,
    });
  }
}
