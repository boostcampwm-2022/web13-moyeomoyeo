import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { githubConfig } from '@config/github/configuration';

@Injectable()
export class GithubConfigService {
  constructor(
    @Inject(githubConfig.KEY)
    private readonly githubConfiguration: ConfigType<typeof githubConfig>,
  ) {}

  get clientId() {
    return this.githubConfiguration.GITHUB_CLIENT_ID;
  }

  get clientSecret() {
    return this.githubConfiguration.GITHUB_CLIENT_SECRET;
  }

  get callbackUrl() {
    return this.githubConfiguration.GITHUB_CALLBACK_URL;
  }

  get redirectUrl() {
    return this.githubConfiguration.GITHUB_REDIRECT_URL;
  }
}
