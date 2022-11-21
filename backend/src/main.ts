import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './common/config/app/config.service';
import { AllExceptionFilter } from './common/filter/all-exception.filter';
import { ApiNotFoundFilter } from './common/filter/api-not-found.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(
    new AllExceptionFilter(httpAdapterHost),
    new ApiNotFoundFilter(httpAdapterHost),
  );

  const appConfigService = app.get(AppConfigService);
  await app.listen(appConfigService.port);
}

bootstrap();
