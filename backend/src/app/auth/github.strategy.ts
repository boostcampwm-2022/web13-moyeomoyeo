import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-github';
import { VerifyCallback } from 'passport-oauth2';
import { GithubConfigService } from '@config/github/config.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(githubConfigService: GithubConfigService) {
    super({
      clientID: githubConfigService.clientId,
      clientSecret: githubConfigService.clientSecret,
      callbackURL: githubConfigService.callbackUrl,
    });
  }

  validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    done(null, profile);
  }
}
