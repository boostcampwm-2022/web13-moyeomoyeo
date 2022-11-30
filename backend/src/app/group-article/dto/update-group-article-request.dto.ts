import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateGroupArticleRequest {
  @IsString()
  @Length(1)
  @ApiProperty({
    example: '수정할 제목',
    description: '게시글 제목',
    required: true,
  })
  title: string;

  @IsString()
  @Length(1)
  @ApiProperty({
    example: '수정할 내용',
    description: '게시글 내용',
    required: true,
  })
  contents: string;

  @IsString()
  @Length(1)
  @ApiProperty({
    example: '1669282011949-761671c7-cc43-4cee-bcb5-4bf3fea9478b.png',
    description: '썸네일 이미지가 저장되어있는 주소',
    required: true,
  })
  thumbnail: string;

  @IsString()
  @Length(1)
  @ApiProperty({
    example: 'https://open.kakao.com/오픈채팅방path',
    description: '카카오톡과 기타 채팅서비스의 주소를 담아놓을 수 있다.',
    required: false,
  })
  chatUrl: string;
}
