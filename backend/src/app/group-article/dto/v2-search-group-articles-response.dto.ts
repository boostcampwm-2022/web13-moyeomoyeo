import { NoOffsetPageResult } from '@common/dto/no-offset-page-result';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { GroupArticleSearchResult } from '@app/group-article/dto/group-article-search-result.dto';

export class V2SearchGroupArticlesResponse extends NoOffsetPageResult<GroupArticleSearchResult> {
  @Expose()
  @ApiProperty({ type: GroupArticleSearchResult, isArray: true })
  get data(): GroupArticleSearchResult[] {
    return this._data;
  }
}
