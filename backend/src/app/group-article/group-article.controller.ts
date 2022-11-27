import { Controller } from '@nestjs/common';
import { GroupArticleService } from '@app/group-article/group-article.service';

@Controller('group-article')
export class GroupArticleController {
  constructor(private readonly groupArticleService: GroupArticleService) {}
}
