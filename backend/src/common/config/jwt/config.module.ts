import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getEnvironmentFilePath, isIgnoreEnvFile } from '@config/config-option';
import { validate } from '@config/jwt/validate';
import { JwtConfigService } from '@config/jwt/config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: getEnvironmentFilePath(),
      ignoreEnvFile: isIgnoreEnvFile(),
      validate,
    }),
  ],
  providers: [JwtConfigService],
  exports: [JwtConfigService],
})
export class JwtConfigModule {}
