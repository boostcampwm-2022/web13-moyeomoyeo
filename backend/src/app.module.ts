import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from '@config/app/config.module';
import { ApiSuccessLoggerMiddleware } from '@middleware/api-success-logger.middleware';
import { ApiExceptionLoggerMiddleware } from '@middleware/api-exception-logger.middleware';
import { DatabaseModule } from '@config/database/database.module';
import { JwtTokenModule } from '@common/module/jwt-token/jwt-token.module';
import { AuthModule } from '@app/auth/auth.module';
import { ImageModule } from '@app/image/image.module';
import { GroupArticleModule } from '@app/group-article/group-article.module';
import { UserModule } from '@app/user/user.module';
import { MyInfoModule } from '@app/myinfo/myinfo.module';
import { CookieConfigModule } from '@config/cookie/config.module';
import { GroupApplicationModule } from '@app/group-application/group-application.module';
import { NotificationModule } from '@app/notification/notification.module';

@Module({
  imports: [
    AppConfigModule,
    CookieConfigModule,
    DatabaseModule,
    JwtTokenModule,
    AuthModule,
    ImageModule,
    GroupArticleModule,
    UserModule,
    MyInfoModule,
    GroupApplicationModule,
    NotificationModule,
  ],
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
