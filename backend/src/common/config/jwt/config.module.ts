import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtConfigService } from '@config/jwt/config.service';
import { jwtConfig } from '@config/jwt/configuration';

@Module({
  imports: [ConfigModule.forFeature(jwtConfig)],
  providers: [JwtConfigService],
  exports: [JwtConfigService],
})
export class JwtConfigModule {}
