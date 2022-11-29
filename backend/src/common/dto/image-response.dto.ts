import { ApiProperty } from '@nestjs/swagger';

export class ImageResponse {
  @ApiProperty({
    example: '1669276833875-64adca9c-94cd-4162-a53f-f75e951e39db',
    description: '이미지 key',
    required: true,
  })
  key: string;

  @ApiProperty({
    example:
      'https://kr.object.ncloudstorage.com/uploads/images/1669276833875-64adca9c-94cd-4162-a53f-f75e951e39db',
    description: '버킷 이미지 url',
    required: true,
  })
  url: string;
}
