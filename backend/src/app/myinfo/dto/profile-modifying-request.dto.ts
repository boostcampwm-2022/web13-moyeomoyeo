import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

export class ProfileModifyingRequest {
  @ApiProperty({
    example: 'pythonstrup',
    description: 'userName',
    required: true,
  })
  @IsString()
  userName: string;

  @ApiProperty({
    example:
      'https://kr.object.ncloudstorage.com/uploads/images/1669276833875-64adca9c-94cd-4162-a53f-f75e951e39db',
    description: '프로필 이미지',
    required: true,
  })
  @IsString()
  profileImage: string;

  @ApiProperty({
    example: '안녕하세요 웹풀스택 개발자 pythonstrup입니다!',
    description: '간단한 자기소개',
    required: true,
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 'https://github.com/pythonstrup',
    description: '깃허브 주소',
    required: true,
  })
  @IsUrl()
  githubUrl: string;

  @ApiProperty({
    example: 'https://myvelop.tistory.com/',
    description: '블로그 주소',
  })
  @IsString()
  blogUrl: string;
}
