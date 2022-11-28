import { Expose } from 'class-transformer';
import { PageResult } from '@common/page-result';
import { ApiProperty } from '@nestjs/swagger';
import { GroupArticleSearchResult } from '@app/group-article/dto/group-article-search-result.dto';

export class SearchGroupArticleResponse extends PageResult<GroupArticleSearchResult> {
  @Expose()
  @ApiProperty({ type: GroupArticleSearchResult, isArray: true })
  get data() {
    return this._data;
  }
}
