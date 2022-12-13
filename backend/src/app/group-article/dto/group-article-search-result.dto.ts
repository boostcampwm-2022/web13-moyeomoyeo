import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  CATEGORY,
  GROUP_STATUS,
  LOCATION,
} from '@app/group-article/constants/group-article.constants';
import { IGroupArticleSearchResult } from '@app/group-article/dto/group-article-search-result.interface';
import { ImageWithBlurResponse } from '@common/dto/image-with-blur-response.dto';

export class GroupArticleSearchResult {
  @ApiProperty({ example: 1, description: '게시글 아이디' })
  id: number;

  @ApiProperty({ example: 'test001', description: '게시글 제목' })
  title: string;

  @ApiProperty({})
  thumbnail: ImageWithBlurResponse;

  @ApiProperty({
    example: GROUP_STATUS.PROGRESS,
    description: '모집 상태',
  })
  status: GROUP_STATUS;

  @ApiProperty({ example: LOCATION.BUSAN, description: '모집 장소' })
  location: LOCATION;

  @ApiProperty({ example: CATEGORY.STUDY, description: '모집 카테고리' })
  category: string;

  @ApiProperty({ example: 10, description: '모집 최대 인원 수' })
  maxCapacity: number;

  @ApiProperty({ example: 3, description: '현재 신청자 수' })
  @Type(() => Number)
  currentCapacity: number;

  @ApiProperty({ example: 0, description: '스크랩 수' })
  @Type(() => Number)
  scrapCount: number;

  @ApiProperty({ example: 1, description: '댓글 수' })
  @Type(() => Number)
  commentCount: number;

  @ApiProperty({
    example: '2022-11-27T16:19:51.706Z',
    description: '게시글 작성일',
  })
  createdAt: Date;

  static from(row: IGroupArticleSearchResult) {
    const res = new GroupArticleSearchResult();
    res.id = row.id;
    res.title = row.title;
    res.thumbnail = ImageWithBlurResponse.from(
      row.thumbnail,
      row.blurThumbnail,
    );
    res.category = row.groupCategoryName;
    res.location = row.location;
    res.status = row.status;
    res.maxCapacity = row.maxCapacity;
    res.currentCapacity = row.currentCapacity;
    res.commentCount = row.commentCount;
    res.scrapCount = row.scrapCount;
    res.createdAt = row.createdAt;
    return res;
  }
}
