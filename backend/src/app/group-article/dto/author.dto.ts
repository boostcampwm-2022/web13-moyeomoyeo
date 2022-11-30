import { ApiProperty } from '@nestjs/swagger';

export class Author {
  @ApiProperty({ example: 1, description: '작성자 아이디' })
  id: number;

  @ApiProperty({ example: '박종혁', description: '작성자 이름' })
  userName: string;

  @ApiProperty({
    example: 'https://avatars.githubusercontent.com/u/67570061?v=4',
    description: '작성자 프로필 이미지',
  })
  profileImage: string;
}
