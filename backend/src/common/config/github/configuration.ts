import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { validate } from '@config/validate';
import { registerAs } from '@nestjs/config';

export class GithubConfig {
  @IsString()
  @Expose()
  GITHUB_CLIENT_ID: string;

  @IsString()
  @Expose()
  GITHUB_CLIENT_SECRET: string;

  @IsString()
  @Expose()
  GITHUB_CALLBACK_URL: string;

  @IsString()
  @Expose()
  GITHUB_REDIRECT_URL: string;
}

export const githubConfig = registerAs('GITHUB', () =>
  validate(process.env, GithubConfig),
);
