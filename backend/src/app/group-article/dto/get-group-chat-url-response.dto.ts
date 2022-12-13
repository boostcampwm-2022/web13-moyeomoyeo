import { ApiProperty } from '@nestjs/swagger';

export class GetGroupChatUrlResponseDto {
  @ApiProperty({
    example: 'https://open.kakao.com/오픈채팅방path',
    description: '카카오톡과 기타 채팅서비스의 주소를 담아놓을 수 있다.',
  })
  chatUrl: string;

  static from(charUrl: string) {
    const res = new GetGroupChatUrlResponseDto();
    res.chatUrl = charUrl;
    return res;
  }
}
