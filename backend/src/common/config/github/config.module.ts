import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GithubConfigService } from '@config/github/config.service';
import { githubConfig } from '@config/github/configuration';

@Module({
  imports: [ConfigModule.forFeature(githubConfig)],
  providers: [GithubConfigService],
  exports: [GithubConfigService],
})
export class GithubConfigModule {}
