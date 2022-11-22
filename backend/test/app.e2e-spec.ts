import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@src/app.module';
import { setNestApp } from '@src/setNestApp';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    setNestApp(app);

    await app.init();
  });
  describe('GET /v1/:id', () => {
    const url = (id) => `/v1/${id}`;

    test('example test', async () => {
      // given
      const id = 11;

      // when
      const result = await request(app.getHttpServer()).get(url(id));

      // then
      expect(result.status).toEqual(200);
      expect(result.body).toMatchObject({
        status: 'OK',
        message: '',
        data: 'Hello World!',
      });
    });
  });
});
