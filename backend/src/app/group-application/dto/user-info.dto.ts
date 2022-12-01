import { ApiProperty } from '@nestjs/swagger';
import { User } from '@src/app/user/entity/user.entity';

export class UserInfo {
  @ApiProperty({
    example: 1,
    description: '유저의 아이디',
    required: true,
  })
  id: number;

  @ApiProperty({
    example: 'username1103',
    description: '유저의 유저 이름',
    required: true,
  })
  userName: string;

  @ApiProperty({
    example: '안녕하세요 예비 인프런 개발자 김명일입니다.',
    description: '유저의 간단한 자기소개',
    required: true,
  })
  description: string;

  @ApiProperty({
    example:
      'https://kr.object.ncloudstorage.com/uploads/images/1669276833875-64adca9c-94cd-4162-a53f-f75e951e39d',
    description: '유저의 프로필 이미지',
    required: true,
  })
  profileImage: string;

  static from(user: User) {
    const response = new UserInfo();
    response.id = user.id;
    response.userName = user.userName;
    response.description = user.description;
    response.profileImage = user.profileImage;
    return response;
  }
}
