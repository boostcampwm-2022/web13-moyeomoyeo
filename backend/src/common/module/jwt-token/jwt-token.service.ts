import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LocalDateTime, ZoneId, ZoneOffset } from '@js-joda/core';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { JwtConfigService } from '@config/jwt/config.service';
import { TokenType } from '@common/module/jwt-token/type/token-type';
import { toLocalDateTime } from '@common/util/date-time';
import { User } from '@app/user/user.entity';
import { AuthTokenPayload } from '@common/module/jwt-token/type/auth-token-payload';

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

  verifyAuthToken(token: string, tokenType: TokenType) {
    try {
      const payload = this.jwtService.verify(token);
      const authTokenPayload = plainToInstance(AuthTokenPayload, payload);

      if (!this.isValidPayload(authTokenPayload, tokenType))
        throw new Error('Invalid Token Payload');

      return authTokenPayload;
    } catch (e) {
      throw new Error('Invalid Token');
    }
  }

  private isValidPayload(
    authTokenPayload: AuthTokenPayload,
    tokenType: TokenType,
  ) {
    const errors = validateSync(authTokenPayload);

    if (errors.length > 0) {
      return false;
    }

    if (authTokenPayload.tokenType !== tokenType) {
      return false;
    }

    return true;
  }
}
