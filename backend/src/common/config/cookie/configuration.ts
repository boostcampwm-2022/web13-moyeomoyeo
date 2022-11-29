import { registerAs } from '@nestjs/config';
import { IsBoolean } from 'class-validator';
import { validate } from '@config/validate';
import { Expose } from 'class-transformer';

export class CookieConfig {
  @Expose()
  @IsBoolean()
  SECURE: boolean;
}

export const cookieConfig = registerAs('Cookie', () => {
  const { SECURE } = process.env;
  return validate({ SECURE: SECURE === 'true' }, CookieConfig);
});
