import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '@src/app.module';
import { GroupArticle } from '@app/group-article/entity/group-article.entity';
import { GroupCategory } from '@app/group-article/entity/group-category.entity';
import { getGroupArticleFixture } from '@app/group-article/__test__/group-article.fixture';
import { getGroupCategoryFixture } from '@app/group-article/__test__/group-category.fixture';
import { getGroupFixture } from '@app/group-article/__test__/group.fixture';
import { User } from '@app/user/entity/user.entity';
import { getUserFixture } from '@app/user/__test__/user.fixture';
import { setNestApp } from '@src/setNestApp';
import { DataSource } from 'typeorm';
import * as request from 'supertest';
import { JwtTokenService } from '@common/module/jwt-token/jwt-token.service';
import { setCookie } from './utils/jwt-test.utils';
import {
  CATEGORY,
  LOCATION,
} from '@app/group-article/constants/group-article.constants';
import { GroupArticleRegisterRequest } from '@app/group-article/dto/group-article-register-request.dto';

describe('Group Application (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    setNestApp(app);

    dataSource = app.get(DataSource);

    await app.init();
  });

  beforeEach(async () => {
    const groupCategoryRepository = dataSource.getRepository(GroupCategory);
    const categories = getGroupCategoryFixture();
    await groupCategoryRepository.save(categories);

    const userRepository = dataSource.getRepository(User);
    const user1 = getUserFixture({ id: 1 });
    const user2 = getUserFixture({ id: 2 });
    await userRepository.save([user1, user2]);

    const group1 = getGroupFixture(categories[1], { id: 1, maxCapacity: 2 });
    const group2 = getGroupFixture(categories[1], { id: 2 });

    const groupArticleRepository = dataSource.getRepository(GroupArticle);
    const groupArticle1 = await getGroupArticleFixture(group1, {
      id: 1,
      user: new Promise((res) => res(user1)),
      userId: user1.id,
    });
    const groupArticle2 = await getGroupArticleFixture(group2, {
      id: 2,
      user: new Promise((res) => res(user1)),
      userId: user1.id,
    });
    await groupArticleRepository.save([groupArticle1, groupArticle2]);
  });

  afterEach(async () => {
    await dataSource.synchronize(true);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  describe('모집 게시글 생성 POST /v1/group-articles', () => {
    const url = () => `/v1/group-articles`;

    test('모집게시글을 등록하면 201 코드와 group article의 아이디(id: 3)를 던진다.', async () => {
      // given
      const jwtService = app.get(JwtTokenService);
      const user = await dataSource.getRepository(User).findOneBy({ id: 1 });
      const accessToken = jwtService.generateAccessToken(user);
      const groupArticleRquest = new GroupArticleRegisterRequest();
      groupArticleRquest.title = 'CS 스터디';
      groupArticleRquest.contents = '';
      groupArticleRquest.category = CATEGORY.STUDY;
      groupArticleRquest.location = LOCATION.ONLINE;
      groupArticleRquest.maxCapacity = 5;
      groupArticleRquest.thumbnail =
        'https://kr.object.ncloudstorage.com/moyeo-images/uploads/images/1669282011949-761671c7-cc43-4cee-bcb5-4bf3fea9478b.png';
      groupArticleRquest.chatUrl = '채팅 url';

      // when
      const result = await request(app.getHttpServer())
        .post(url())
        .set({ Cookie: setCookie(accessToken.accessToken) })
        .send(groupArticleRquest);

      // then
      expect(result.status).toEqual(201);
      expect(result.body.data.id).toEqual(3);
    });

    test('모집게시글을 등록할 때 타이틀이 0자면 400 에러를 보낸다.', async () => {
      // given
      const jwtService = app.get(JwtTokenService);
      const user = await dataSource.getRepository(User).findOneBy({ id: 1 });
      const accessToken = jwtService.generateAccessToken(user);
      const groupArticleRquest = new GroupArticleRegisterRequest();
      groupArticleRquest.title = '';
      groupArticleRquest.contents = '';
      groupArticleRquest.category = CATEGORY.STUDY;
      groupArticleRquest.location = LOCATION.ONLINE;
      groupArticleRquest.maxCapacity = 5;
      groupArticleRquest.thumbnail =
        'https://kr.object.ncloudstorage.com/moyeo-images/uploads/images/1669282011949-761671c7-cc43-4cee-bcb5-4bf3fea9478b.png';
      groupArticleRquest.chatUrl = '채팅 url';

      // when
      const result = await request(app.getHttpServer())
        .post(url())
        .set({ Cookie: setCookie(accessToken.accessToken) })
        .send(groupArticleRquest);

      // then
      expect(result.status).toEqual(400);
    });

    test('모집게시글을 등록할 때 타이틀이 100자 초과면 400 에러를 보낸다.', async () => {
      // given
      const jwtService = app.get(JwtTokenService);
      const user = await dataSource.getRepository(User).findOneBy({ id: 1 });
      const accessToken = jwtService.generateAccessToken(user);
      const groupArticleRquest = new GroupArticleRegisterRequest();
      groupArticleRquest.title = 'a'.repeat(101);
      groupArticleRquest.contents = '';
      groupArticleRquest.category = CATEGORY.STUDY;
      groupArticleRquest.location = LOCATION.ONLINE;
      groupArticleRquest.maxCapacity = 5;
      groupArticleRquest.thumbnail =
        'https://kr.object.ncloudstorage.com/moyeo-images/uploads/images/1669282011949-761671c7-cc43-4cee-bcb5-4bf3fea9478b.png';
      groupArticleRquest.chatUrl = '채팅 url';

      // when
      const result = await request(app.getHttpServer())
        .post(url())
        .set({ Cookie: setCookie(accessToken.accessToken) })
        .send(groupArticleRquest);

      // then
      expect(result.status).toEqual(400);
    });

    test('모집게시글을 등록할 때 정해진 카테고리값을 입력하지 않으면 400에러를 뱉는다.', async () => {
      // given
      const jwtService = app.get(JwtTokenService);
      const user = await dataSource.getRepository(User).findOneBy({ id: 1 });
      const accessToken = jwtService.generateAccessToken(user);

      // when
      const result = await request(app.getHttpServer())
        .post(url())
        .set({ Cookie: setCookie(accessToken.accessToken) })
        .send({
          title: 'study',
          contents: '',
          category: 'nothing',
          location: LOCATION.ONLINE,
          maxCapacity: 10,
          thumbnail:
            'https://kr.object.ncloudstorage.com/moyeo-images/uploads/images/1669282011949-761671c7-cc43-4cee-bcb5-4bf3fea9478b.png',
          chatUrl: 'url',
        });

      // then
      expect(result.status).toEqual(400);
    });

    test('모집게시글을 등록할 때 정해진 위치값을 입력하지 않으면 400에러를 뱉는다.', async () => {
      // given
      const jwtService = app.get(JwtTokenService);
      const user = await dataSource.getRepository(User).findOneBy({ id: 1 });
      const accessToken = jwtService.generateAccessToken(user);

      // when
      const result = await request(app.getHttpServer())
        .post(url())
        .set({ Cookie: setCookie(accessToken.accessToken) })
        .send({
          title: 'study',
          contents: '',
          category: CATEGORY.STUDY,
          location: 'nothing',
          maxCapacity: 10,
          thumbnail:
            'https://kr.object.ncloudstorage.com/moyeo-images/uploads/images/1669282011949-761671c7-cc43-4cee-bcb5-4bf3fea9478b.png',
          chatUrl: 'url',
        });

      // then
      expect(result.status).toEqual(400);
    });

    test('모집게시글을 등록할 때 최대 인원을 초과하면 400 에러를 보여준다.', async () => {
      // given
      const jwtService = app.get(JwtTokenService);
      const user = await dataSource.getRepository(User).findOneBy({ id: 1 });
      const accessToken = jwtService.generateAccessToken(user);
      const groupArticleRquest = new GroupArticleRegisterRequest();
      groupArticleRquest.title = 'CS 스터디';
      groupArticleRquest.contents = '';
      groupArticleRquest.category = CATEGORY.STUDY;
      groupArticleRquest.location = LOCATION.ONLINE;
      groupArticleRquest.maxCapacity = 30;
      groupArticleRquest.thumbnail =
        'https://kr.object.ncloudstorage.com/moyeo-images/uploads/images/1669282011949-761671c7-cc43-4cee-bcb5-4bf3fea9478b.png';
      groupArticleRquest.chatUrl = '채팅 url';

      // when
      const result = await request(app.getHttpServer())
        .post(url())
        .set({ Cookie: setCookie(accessToken.accessToken) })
        .send(groupArticleRquest);

      // then
      expect(result.status).toEqual(400);
    });

    test('JWT 토큰이 없을 때 401 에러를 던진다.', async () => {
      // given

      // when
      const result = await request(app.getHttpServer()).post(url());

      // then
      expect(result.status).toEqual(401);
    });
  });
});
