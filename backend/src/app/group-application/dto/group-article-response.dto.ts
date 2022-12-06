import { ApiProperty } from '@nestjs/swagger';
import {
  CATEGORY,
  GROUP_STATUS,
  LOCATION,
} from '@src/app/group-article/constants/group-article.constants';
import { IMyGroupResult } from '@app/group-application/dto/my-group-result.interface';

export class GroupArticleResponse {
  @ApiProperty({
    example: 1,
    description: '모임게시판 아이디',
    required: true,
  })
  groupArticleId: number;

  @ApiProperty({
    example: 'CS 스터디 모임',
    description: '모임게시판 제목',
    required: true,
  })
  title: string;

  @ApiProperty({
    example: LOCATION.ONLINE,
    description: '모임 위치',
    required: true,
  })
  location: LOCATION;

  @ApiProperty({
    example: CATEGORY.STUDY,
    description: '모임게시판 카테고리',
    required: true,
  })
  category: CATEGORY;

  @ApiProperty({
    example: 5,
    description: '댓글 개수',
    required: true,
  })
  commentCount: number;

  @ApiProperty({
    example: 10,
    description: '스크랩한 개수',
    required: true,
  })
  scrapCount: number;

  @ApiProperty({
    example:
      'https://kr.object.ncloudstorage.com/uploads/images/1669276833875-64adca9c-94cd-4162-a53f-f75e951e39db',
    description: '썸네일 이미지 주소',
    required: true,
  })
  thumbnail: string;

  @ApiProperty({
    example: 10,
    description: '모임 최대 인원',
    required: true,
  })
  maxCapacity: number;

  @ApiProperty({
    example: 5,
    description: '모임 현재 인원',
    required: true,
  })
  currentCapacity: number;

  @ApiProperty({
    example: GROUP_STATUS.PROGRESS,
    description: '모임게시판 모집 상태',
    required: true,
  })
  status: GROUP_STATUS;

  @ApiProperty({
    example: '2022년 12월 1일',
    description: '모임게시판 생성 날짜',
    required: true,
  })
  createdAt: Date;

  static from(myGroup: IMyGroupResult) {
    const response = new GroupArticleResponse();
    response.groupArticleId = myGroup.groupArticleId;
    response.title = myGroup.title;
    response.location = myGroup.location;
    response.category = myGroup.category;
    response.commentCount = myGroup.commentCount;
    response.scrapCount = myGroup.scrapCount;
    response.thumbnail = myGroup.thumbnail;
    response.maxCapacity = myGroup.maxCapacity;
    response.currentCapacity = Number(myGroup.currentCapacity);
    response.status = myGroup.status;
    response.createdAt = myGroup.createdAt;
  }
}
