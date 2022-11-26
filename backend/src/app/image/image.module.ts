import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { S3ConfigModule } from '@src/common/config/s3/config.module';

@Module({
  imports: [S3ConfigModule],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
