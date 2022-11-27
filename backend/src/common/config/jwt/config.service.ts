import { ConfigType } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';
import { jwtConfig } from '@config/jwt/configuration';

@Injectable()
export class JwtConfigService {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  get secret() {
    return this.jwtConfiguration.JWT_SECRET;
  }

  get accessTokenExpirationMinutes() {
    return this.jwtConfiguration.JWT_ACCESS_TOKEN_EXPIRATION_MINUTES;
  }

  get refreshTokenExpirationDays() {
    return this.jwtConfiguration.JWT_REFRESH_TOKEN_EXPIRATION_DAYS;
  }
}
