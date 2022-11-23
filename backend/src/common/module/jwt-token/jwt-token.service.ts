import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LocalDateTime, ZoneId, ZoneOffset } from '@js-joda/core';
import { JwtConfigService } from '@config/jwt/config.service';
import { TokenType } from '@common/module/jwt-token/type/token-type';
import { toLocalDateTime } from '@common/util/date-time';
import { User } from '@app/user/user.entity';

@Injectable()
export class JwtTokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly jwtConfigService: JwtConfigService,
  ) {}

  generateToken(user: User, expires: number, tokenType: TokenType) {
    return this.jwtService.sign({
      userId: user.id,
      exp: expires,
      tokenType,
      iat: LocalDateTime.now(ZoneId.UTC).toEpochSecond(ZoneOffset.UTC),
    });
  }

  generateAccessToken(user: User, now: Date = new Date()) {
    const accessTokenExpires = toLocalDateTime(now)
      .plusMinutes(this.jwtConfigService.accessTokenExpirationMinutes)
      .toEpochSecond(ZoneOffset.UTC);
    const accessToken = this.generateToken(
      user,
      accessTokenExpires,
      TokenType.ACCESS,
    );

    return {
      accessToken,
      accessTokenExpires,
    };
  }

  generateRefreshToken(user: User, now: Date = new Date()) {
    const refreshTokenExpires = toLocalDateTime(now)
      .plusDays(this.jwtConfigService.refreshTokenExpirationDays)
      .toEpochSecond(ZoneOffset.UTC);
    const refreshToken = this.generateToken(
      user,
      refreshTokenExpires,
      TokenType.REFRESH,
    );

    return {
      refreshToken,
      refreshTokenExpires,
    };
  }
}
