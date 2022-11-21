import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './common/config/app/config.service';

import { setNestApp } from './setNestApp';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setNestApp(app);

  const appConfigService = app.get(AppConfigService);
  await app.listen(appConfigService.port);
}

bootstrap();
