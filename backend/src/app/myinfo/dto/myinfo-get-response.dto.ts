import { ApiProperty } from '@nestjs/swagger';
import { User } from '@src/app/user/entity/user.entity';

export class MyInfoGetResponse {
  @ApiProperty({
    example: 1,
    description: 'user id',
    required: true,
  })
  id: number;

  @ApiProperty({
    example: 'pythonstrup',
    description: 'username',
    required: true,
  })
  username: string;

  @ApiProperty({
    example:
      'https://kr.object.ncloudstorage.com/uploads/images/1669276833875-64adca9c-94cd-4162-a53f-f75e951e39db',
    description: '프로필 이미지',
    required: false,
  })
  profileImage: string;

  @ApiProperty({
    example: '안녕하세요 웹풀스택 개발자 pythonstrup입니다!',
    description: '간단한 자기소개',
    required: true,
  })
  description: string;

  @ApiProperty({
    example: 'https://github.com/pythonstrup',
    description: '깃허브 주소',
    required: true,
  })
  githubUrl: string;

  @ApiProperty({
    example: 'https://myvelop.tistory.com/',
    description: '블로그 주소',
    required: true,
  })
  blogUrl: string;

  static from(user: User) {
    const response = new User();
    response.id = user.id;
    response.username = user.username;
    response.profileImage = user.profileImage;
    response.description = user.description;
    response.githubUrl = user.githubUrl;
    response.blogUrl = user.blogUrl;
  }
}
