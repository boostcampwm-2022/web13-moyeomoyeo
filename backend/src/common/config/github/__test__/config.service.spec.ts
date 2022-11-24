import { Test } from '@nestjs/testing';
import { GithubConfigModule } from '@config/github/config.module';
import { GithubConfigService } from '@config/github/config.service';

describe('GithubConfigService Test', () => {
  let githubConfigService: GithubConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [GithubConfigModule],
    }).compile();

    githubConfigService = module.get(GithubConfigService);
  });

  test('clientId를 잘 가져오는가', async () => {
    // given
    const clientId = process.env.GITHUB_CLIENT_ID;

    // when

    // then
    expect(githubConfigService.clientId).toEqual(clientId);
  });

  test('clientSecret을 잘 가져오는가', async () => {
    // given
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;

    // when

    // then
    expect(githubConfigService.clientSecret).toEqual(clientSecret);
  });

  test('callbackUrl을 잘 가져오는가', async () => {
    // given
    const callbackUrl = process.env.GITHUB_CALLBACK_URL;

    // when

    // then
    expect(githubConfigService.callbackUrl).toEqual(callbackUrl);
  });
});
