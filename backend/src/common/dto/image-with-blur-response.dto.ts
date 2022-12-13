import { ApiProperty } from '@nestjs/swagger';

export class ImageWithBlurResponse {
  @ApiProperty({
    example:
      'https://kr.object.ncloudstorage.com/uploads/images/1669276833875-64adca9c-94cd-4162-a53f-f75e951e39db',
    description: '이미지 원본 url',
    required: true,
  })
  originUrl: string;

  @ApiProperty({
    example:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAACE3AAAhNwEzWJ96AAAAP0lEQVR4nAE0AMv/APPz8v///9O8uOba1wDn4ea3v8qgn6bs5OMAtc6/AANBABtT6d/HANvn3ZawsdbO2fr59MePI7dvVudoAAAAAElFTkSuQmCC',
    description: 'blur 이미지 url',
    required: true,
  })
  blurUrl: string;

  static from(thumbnail: string, blurThumbnail: string) {
    const res = new ImageWithBlurResponse();
    res.originUrl = thumbnail;
    res.blurUrl = blurThumbnail === '' ? thumbnail : blurThumbnail;
    return res;
  }
}
