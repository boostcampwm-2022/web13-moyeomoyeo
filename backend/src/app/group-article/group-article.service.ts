import { Injectable, Logger } from '@nestjs/common';
import { ARTICLE } from './constants/group-article.constants';
import { GroupArticleRegisterResquest } from './dto/group-article-register-request.dto';
import { GroupArticle } from './entity/group-article.entity';
import { GroupCategoryNotFound } from './exception/group-category-not-found';
import { GroupArticleRepository } from './repository/article.repository';
import { GroupCategoryRepository } from './repository/group-category.repository';
import { GroupRepository } from './repository/group.repository';

@Injectable()
export class GroupArticleService {
  private readonly logger = new Logger(GroupArticleService.name);

  constructor(
    private readonly groupRepository: GroupRepository,
    private readonly groupArticleRepository: GroupArticleRepository,
    private readonly groupCategoryRepository: GroupCategoryRepository,
  ) {}

  async registerGroupArticle(
    groupArticleRegisterResquest: GroupArticleRegisterResquest,
    type: ARTICLE,
  ) {
    const category = await this.groupCategoryRepository.findByCategoryName(
      groupArticleRegisterResquest.category,
    );
    if (category === null) throw new GroupCategoryNotFound();

    const groupArticle = GroupArticle.register({
      title: groupArticleRegisterResquest.title,
      contents: groupArticleRegisterResquest.contents,
      type: type,
      thumbnail: groupArticleRegisterResquest.thumbnail,
      location: groupArticleRegisterResquest.location,
      maxCapacity: groupArticleRegisterResquest.maxCapacity,
      chatUrl: groupArticleRegisterResquest.chatUrl,
      category: category,
    });
    return this.groupArticleRepository.save(groupArticle);
  }
}
