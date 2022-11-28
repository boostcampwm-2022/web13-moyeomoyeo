import { Module } from '@nestjs/common';
import { ImageController } from '@app/image/image.controller';
import { ImageService } from '@app/image/image.service';
import { S3ConfigModule } from '@src/common/config/s3/config.module';

@Module({
  imports: [S3ConfigModule],
  controllers: [ImageController],
  providers: [ImageService],
  exports: [ImageService],
})
export class ImageModule {}
