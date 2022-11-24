import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getEnvironmentFilePath, isIgnoreEnvFile } from '@config/config-option';
import { validate } from '@config/github/validate';
import { GithubConfigService } from '@config/github/config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: getEnvironmentFilePath(),
      ignoreEnvFile: isIgnoreEnvFile(),
      validate,
    }),
  ],
  providers: [GithubConfigService],
  exports: [GithubConfigService],
})
export class GithubConfigModule {}
