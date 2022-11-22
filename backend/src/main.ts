import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './common/config/app/config.service';

import { setNestApp } from './setNestApp';
import { setSwagger } from './setSwagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setNestApp(app);

  setSwagger(app);

  const appConfigService = app.get(AppConfigService);
  await app.listen(appConfigService.port);
}

bootstrap();
