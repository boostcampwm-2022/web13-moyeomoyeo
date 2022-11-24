import { ConfigService } from '@nestjs/config';
import { JwtConfig } from '@config/jwt/validate';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtConfigService {
  constructor(private readonly configService: ConfigService<JwtConfig, true>) {}

  get secret() {
    return this.configService.get('JWT_SECRET', { infer: true });
  }

  get accessTokenExpirationMinutes() {
    return this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_MINUTES', {
      infer: true,
    });
  }

  get refreshTokenExpirationDays() {
    return this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_DAYS', {
      infer: true,
    });
  }
}
