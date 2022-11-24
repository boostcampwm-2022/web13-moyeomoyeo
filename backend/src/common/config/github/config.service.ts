import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GithubConfig } from '@config/github/validate';

@Injectable()
export class GithubConfigService {
  constructor(
    private readonly configService: ConfigService<GithubConfig, true>,
  ) {}

  get clientId() {
    return this.configService.get('GITHUB_CLIENT_ID', { infer: true });
  }

  get clientSecret() {
    return this.configService.get('GITHUB_CLIENT_SECRET', { infer: true });
  }

  get callbackUrl() {
    return this.configService.get('GITHUB_CALLBACK_URL', { infer: true });
  }

  get redirectUrl() {
    return this.configService.get('GITHUB_REDIRECT_URL', { infer: true });
  }
}
