import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './common/config/app/config.module';
import { ApiSuccessLoggerMiddleware } from './common/middleware/api-success-logger.middleware';
import { ApiExceptionLoggerMiddleware } from './common/middleware/api-exception-logger.middleware';

@Module({
  imports: [AppConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ApiSuccessLoggerMiddleware, ApiExceptionLoggerMiddleware)
      .forRoutes('*');
  }
}
