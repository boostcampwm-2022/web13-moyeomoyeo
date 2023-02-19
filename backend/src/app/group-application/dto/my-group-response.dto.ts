import { GroupArticleResponse } from '@app/group-application/dto/group-article-response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { PageResult } from '@common/dto/page-result';
import { Expose } from 'class-transformer';

export class MyGroupResponse extends PageResult<GroupArticleResponse> {
  @Expose()
  @ApiProperty({ type: GroupArticleResponse, isArray: true })
  get data() {
    return this._data;
  }
}
