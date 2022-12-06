import { Injectable } from '@nestjs/common';
import { GroupArticleRepository } from '@app/group-article/repository/group-article.repository';
import { User } from '@app/user/entity/user.entity';
import { GroupArticleNotFoundException } from '@app/group-article/exception/group-article-not-found.exception';
import { NotAuthorException } from '@app/group-article/exception/not-author.exception';

@Injectable()
export class MyGroupArticleService {
  constructor(
    private readonly groupArticleRepository: GroupArticleRepository,
  ) {}

  async getById(user: User, id: number) {
    const groupArticle = await this.groupArticleRepository.findById(id);
    if (!groupArticle) {
      throw new GroupArticleNotFoundException();
    }

    if (!groupArticle.isAuthor(user)) {
      throw new NotAuthorException();
    }

    return groupArticle;
  }
}
