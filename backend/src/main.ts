import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/app.module';
import { AppConfigService } from '@src/common/config/app/config.service';
import { setNestApp } from '@src/setNestApp';
import { setSwagger } from '@src/setSwagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setNestApp(app);

  setSwagger(app);

  const appConfigService = app.get(AppConfigService);
  await app.listen(appConfigService.port);
}

bootstrap();
