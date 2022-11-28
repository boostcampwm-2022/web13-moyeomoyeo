import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CookiesRequest {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImV4cCI6MTY2OTYyMzA1MCwidG9rZW5UeXBlIjoiQUNDRVNTIiwiaWF0IjoxNjY5NjIxMjUwfQ.p_TLNll1q4ui4sYet9viJKMF7HLsDZ20iGXx4RgrRzw',
    description: 'access token',
    required: true,
  })
  @IsString()
  access_token: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImV4cCI6MTY2OTYyMzA1MCwidG9rZW5UeXBlIjoiQUNDRVNTIiwiaWF0IjoxNjY5NjIxMjUwfQ.p_TLNll1q4ui4sYet9viJKMF7HLsDZ20iGXx4RgrRzw',
    description: 'refresh token',
    required: true,
  })
  @IsString()
  refresh_token: string;
}
