import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '@config/database/typeorm/config.module';
import { TypeOrmConfigService } from '@config/database/typeorm/config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [TypeOrmConfigModule],
      useExisting: TypeOrmConfigService,
    }),
  ],
})
export class DatabaseModule {}
