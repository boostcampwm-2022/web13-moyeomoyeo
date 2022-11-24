import { Test } from '@nestjs/testing';
import { JwtConfigService } from '@config/jwt/config.service';
import { JwtConfigModule } from '@config/jwt/config.module';

describe('JwtConfigService Test', () => {
  let jwtConfigService: JwtConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [JwtConfigModule],
    }).compile();

    jwtConfigService = module.get<JwtConfigService>(JwtConfigService);
  });

  test('secret을 잘 가져오는가', async () => {
    // given
    const secret = process.env.JWT_SECRET;
    // when

    // then
    expect(jwtConfigService.secret).toEqual(secret);
  });

  test('accessTokenExpirationMinutes를 잘 가져오는가', async () => {
    // given
    const accessTokenExpirationMinutes =
      process.env.JWT_ACCESS_TOKEN_EXPIRATION_MINUTES;
    // when
    // then
    expect(jwtConfigService.accessTokenExpirationMinutes).toEqual(
      parseInt(accessTokenExpirationMinutes, 10),
    );
  });

  test('refreshTokenExpirationDays를 잘 가져오는가', async () => {
    // given
    const refreshTokenExpirationDays =
      process.env.JWT_REFRESH_TOKEN_EXPIRATION_DAYS;
    // when
    // then
    expect(jwtConfigService.refreshTokenExpirationDays).toEqual(
      parseInt(refreshTokenExpirationDays, 10),
    );
  });
});
