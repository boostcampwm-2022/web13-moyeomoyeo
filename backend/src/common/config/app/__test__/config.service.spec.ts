import { AppConfigService } from '../config.service';
import { Test } from '@nestjs/testing';
import { AppConfigModule } from '../config.module';

describe('App Config Service Test', () => {
  let appConfigService: AppConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppConfigModule],
    }).compile();

    appConfigService = module.get(AppConfigService);
  });
  test('환경변수로 설정된 PORT 번호를 잘 가져오는가', async () => {
    // given

    // when

    // then
    expect(appConfigService.port).toEqual(parseInt(process.env.PORT, 10));
  });

  test('환경변수로 설정된 NODE_ENV를 잘 가져오는가', async () => {
    // given

    // when

    // then
    expect(appConfigService.env).toEqual(process.env.NODE_ENV);
  });
});
