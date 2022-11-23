import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ApiSuccessLoggerMiddleware } from '@middleware/api-success-logger.middleware';
import { ApiExceptionLoggerMiddleware } from '@middleware/api-exception-logger.middleware';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { S3ConfigModule } from '@src/common/config/s3/config.module';

@Module({
  imports: [S3ConfigModule],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ApiSuccessLoggerMiddleware, ApiExceptionLoggerMiddleware)
      .forRoutes('*');
  }
}
