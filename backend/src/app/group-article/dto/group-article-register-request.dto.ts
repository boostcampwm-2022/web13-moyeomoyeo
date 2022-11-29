import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString, Length, Min } from 'class-validator';
import {
  CATEGORY,
  LOCATION,
} from '@app/group-article/constants/group-article.constants';

export class GroupArticleRegisterRequest {
  @ApiProperty({
    example: 'CS 스터디 모집',
    description: '모집게시글 제목',
    required: true,
  })
  @IsString()
  @Length(1, 100)
  title: string;

  @ApiProperty({
    example: `
      안녕하세요. 서울 지역 CS 스터디원들을 모집합니다!
      <img width="1440" alt="서울 지역 CS 모집 사진자료" src="https://kr.object.ncloudstorage.com/moyeo-images/uploads/images/1669282011949-761671c7-cc43-4cee-bcb5-4bf3fea9478b.png">
      `,
    description: '마크다운 형식의 게시글 내용',
    required: true,
  })
  @IsString()
  contents: string;

  @ApiProperty({
    example: CATEGORY.STUDY,
    description: 'Enum 형태의 자료형 - 카테고리',
    required: true,
  })
  @IsEnum(CATEGORY)
  category: CATEGORY;

  @ApiProperty({
    example: LOCATION.ONLINE,
    description: 'Enum 형태의 자료형 - 지역',
    required: true,
  })
  @IsEnum(LOCATION)
  location: LOCATION;

  @ApiProperty({
    example: 10,
    description: '모임의 최대 인원을 몇 명으로 할 것인지 정할 수 있다.',
    required: true,
  })
  @IsNumber()
  @Min(2)
  maxCapacity: number;

  @ApiProperty({
    example:
      'https://kr.object.ncloudstorage.com/moyeo-images/uploads/images/1669282011949-761671c7-cc43-4cee-bcb5-4bf3fea9478b.png',
    description: '썸네일 이미지가 저장되어있는 주소',
    required: true,
  })
  @IsString()
  thumbnail: string;

  @ApiProperty({
    example: 'https://open.kakao.com/오픈채팅방path',
    description: '카카오톡과 기타 채팅서비스의 주소를 담아놓을 수 있다.',
    required: false,
  })
  @IsString()
  chatUrl: string;
}
