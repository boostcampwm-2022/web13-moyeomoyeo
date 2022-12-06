import { ApiProperty } from '@nestjs/swagger';
import {
  CATEGORY,
  GROUP_STATUS,
  LOCATION,
} from '@app/group-article/constants/group-article.constants';
import { GroupArticle } from '@app/group-article/entity/group-article.entity';

export class GetMyGroupArticleResponse {
  @ApiProperty({ example: 1, description: '게시글 아이디' })
  id: number;

  @ApiProperty({ example: 'CS 스터디 모집', description: '게시글 제목' })
  title: string;

  @ApiProperty({
    example: `안녕하세요. 서울 지역 CS 스터디원들을 모집합니다!\\n<img width="1440" alt="서울 지역 CS 모집 사진자료" src="https://kr.object.ncloudstorage.com/moyeo-images/uploads/images/1669282011949-761671c7-cc43-4cee-bcb5-4bf3fea9478b.png">`,
    description: '게시글 제목',
  })
  contents: string;

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

  @ApiProperty({ example: 10, description: '최대 모집 인원' })
  maxCapacity: number;

  @ApiProperty({
    example: 'https://open.kakao.com/오픈채팅방path',
    description: '카카오톡과 기타 채팅서비스의 주소를 담아놓을 수 있다.',
  })
  url: string;

  @ApiProperty({ example: new Date(), description: '게시글 작성일' })
  createdAt: Date;

  static from(groupArticle: GroupArticle) {
    const res = new GetMyGroupArticleResponse();
    res.id = groupArticle.id;
    res.title = groupArticle.title;
    res.contents = groupArticle.contents;
    res.category = groupArticle.group.category.name;
    res.thumbnail = groupArticle.group.thumbnail;
    res.status = groupArticle.group.status;
    res.location = groupArticle.group.location;
    res.maxCapacity = groupArticle.group.maxCapacity;
    res.url = groupArticle.group.chatUrl;
    res.createdAt = groupArticle.group.createdAt;
    return res;
  }
}
