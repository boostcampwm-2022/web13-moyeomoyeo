import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResponseEntity } from '@common/response-entity';
import { JwtAuthGuard } from '@common/guard/jwt-auth.guard';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [AppController],
      providers: [AppService],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(() => {
        return null;
      })
      .compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    test('example test', async () => {
      // given
      const id = 11;

      // when
      const result = appController.getHello({ id });

      // then

      expect(result).toEqual(ResponseEntity.OK_WITH_DATA('Hello World!'));
    });
  });
});
