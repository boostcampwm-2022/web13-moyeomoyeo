import { JwtTokenService } from '@common/module/jwt-token/jwt-token.service';
import { JwtService } from '@nestjs/jwt';
import { JwtTokenModule } from '@common/module/jwt-token/jwt-token.module';
import { Test } from '@nestjs/testing';
import { TokenType } from '@common/module/jwt-token/type/token-type';

describe('JwtTokenService Test', () => {
  let jwtTokenService: JwtTokenService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [JwtTokenModule],
    }).compile();

    jwtTokenService = module.get(JwtTokenService);
    jwtService = module.get(JwtService);
  });
  describe('verifyAuthToken', () => {
    test('토큰이 유효하면 authTokenPayload를 리턴하는가', async () => {
      // given
      const accessToken = jwtService.sign({
        userId: 1,
        tokenType: TokenType.ACCESS,
        exp: Date.now() + 1000 * 60 * 60,
      });

      // when
      const result = jwtTokenService.verifyAuthToken(
        accessToken,
        TokenType.ACCESS,
      );

      // then
      expect(result).toMatchObject({ userId: 1, tokenType: TokenType.ACCESS });
    });

    test('토큰이 유효하지 않으면 예외를 반환하는가', async () => {
      // given
      const token = 'sdfjasifojdsio.fdsajfiodsj.fsdajfpoas';

      // when
      const wrapper = async () => {
        jwtTokenService.verifyAuthToken(token, TokenType.ACCESS);
      };

      // then
      expect(wrapper).rejects.toThrow(Error);
    });

    test('토큰 타입이 다른 경우 예외를 반환하는가', async () => {
      // given
      const accessToken = jwtService.sign({
        userId: 1,
        tokenType: TokenType.ACCESS,
        exp: Date.now() + 1000 * 60 * 60,
      });

      // when
      const wrapper = async () => {
        jwtTokenService.verifyAuthToken(accessToken, TokenType.REFRESH);
      };

      // then
      expect(wrapper).rejects.toThrow(Error);
    });

    test('토큰에 userId가 없는 경우 예외를 반환하는가', async () => {
      // given
      const accessToken = jwtService.sign({
        tokenType: TokenType.ACCESS,
        exp: Date.now() + 1000 * 60 * 60,
      });

      // when
      const wrapper = async () => {
        jwtTokenService.verifyAuthToken(accessToken, TokenType.ACCESS);
      };

      // then
      expect(wrapper).rejects.toThrow(Error);
    });

    test('토큰의 유효기간이 만료된 경우 예외를 반환하는가', async () => {
      // given
      const accessToken = jwtService.sign({
        tokenType: TokenType.ACCESS,
        exp: Date.now() - 1000,
      });

      // when
      const wrapper = async () => {
        jwtTokenService.verifyAuthToken(accessToken, TokenType.ACCESS);
      };

      // then
      expect(wrapper).rejects.toThrow(Error);
    });
  });
});
