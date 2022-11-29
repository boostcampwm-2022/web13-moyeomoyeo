import { registerAs } from '@nestjs/config';
import { IsBoolean, IsString } from 'class-validator';
import { validate } from '@config/validate';
import { Expose } from 'class-transformer';

export class CookieConfig {
  @Expose()
  @IsBoolean()
  SECURE: boolean;

  @IsString()
  @Expose()
  DOMAIN: string;
}

export const cookieConfig = registerAs('Cookie', () => {
  const { SECURE, DOMAIN } = process.env;
  return validate({ SECURE: SECURE === 'true', DOMAIN }, CookieConfig);
});
