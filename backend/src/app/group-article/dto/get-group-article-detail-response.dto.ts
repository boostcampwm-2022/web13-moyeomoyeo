import { Type } from 'class-transformer';
import {
  CATEGORY,
  GROUP_STATUS,
  LOCATION,
} from '@app/group-article/constants/group-article.constants';
import { IGroupArticleDetail } from '@app/group-article/dto/group-article-detail.interface';
import { ImageService } from '@app/image/image.service';
import { ApiProperty } from '@nestjs/swagger';
import { Author } from '@app/group-article/dto/author.dto';

export class GetGroupArticleDetailResponse {
  @ApiProperty({ example: 1, description: '게시글 아이디' })
  id: number;

  @ApiProperty({ example: 'CS 스터디 모집', description: '게시글 제목' })
  title: string;

  @ApiProperty({
    example: `안녕하세요. 서울 지역 CS 스터디원들을 모집합니다!\\n<img width="1440" alt="서울 지역 CS 모집 사진자료" src="https://kr.object.ncloudstorage.com/moyeo-images/uploads/images/1669282011949-761671c7-cc43-4cee-bcb5-4bf3fea9478b.png">`,
    description: '게시글 제목',
  })
  content: string;

  @ApiProperty()
  author: Author;

  @ApiProperty({ example: CATEGORY.STUDY, description: '모집 카테고리' })
  category: string;

  @ApiProperty({ example: LOCATION.ONLINE, description: '모임 장소' })
  location: LOCATION;

  @ApiProperty({
    example:
      'https://kr.object.ncloudstorage.com/uploads/images/1669276833875-64adca9c-94cd-4162-a53f-f75e951e39db',
    description: '게시글 썸네일',
  })
  thumbnail: string;

  @ApiProperty({
    example: GROUP_STATUS.PROGRESS,
    description: '모집 게시글 상태',
  })
  status: GROUP_STATUS;

  @ApiProperty({ example: 10, description: '댓글 수' })
  @Type(() => Number)
  commentCount: number;

  @ApiProperty({ example: 12, description: '스크랩 수' })
  @Type(() => Number)
  scrapCount: number;

  @ApiProperty({ example: 10, description: '최대 모집 인원' })
  maxCapacity: number;

  @ApiProperty({ example: new Date(), description: '게시글 작성일' })
  createdAt: Date;

  static from(
    groupArticleDetail: IGroupArticleDetail,
    imageService: ImageService,
  ) {
    const res = new GetGroupArticleDetailResponse();
    res.id = groupArticleDetail.id;
    res.title = groupArticleDetail.title;
    res.content = groupArticleDetail.contents;
    res.author = {
      id: groupArticleDetail.userId,
      userName: groupArticleDetail.userName,
      profileImage: groupArticleDetail.userProfileImage,
    };
    res.category = groupArticleDetail.groupCategoryName;
    res.thumbnail = imageService.getStorageUrl([
      groupArticleDetail.thumbnail,
    ])[0];
    res.status = groupArticleDetail.status;
    res.location = groupArticleDetail.location;
    res.commentCount = groupArticleDetail.commentCount;
    res.scrapCount = groupArticleDetail.scrapCount;
    res.maxCapacity = groupArticleDetail.maxCapacity;
    res.createdAt = groupArticleDetail.createdAt;
    return res;
  }
}
