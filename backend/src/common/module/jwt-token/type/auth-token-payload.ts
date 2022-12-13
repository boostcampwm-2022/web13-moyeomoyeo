import { TokenType } from '@common/module/jwt-token/type/token-type';
import { IsEnum, IsNumber, Min } from 'class-validator';

export class AuthTokenPayload {
  @IsNumber()
  @Min(1)
  userId: number;

  @IsEnum(TokenType)
  tokenType: TokenType;
}
