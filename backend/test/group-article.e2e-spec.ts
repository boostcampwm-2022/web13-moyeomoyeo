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
  GROUP_STATUS,
  LOCATION,
} from '@app/group-article/constants/group-article.constants';
import { GroupArticleRegisterRequest } from '@app/group-article/dto/group-article-register-request.dto';
import { UpdateGroupArticleRequest } from '@src/app/group-article/dto/update-group-article-request.dto';
import { GroupApplication } from '@src/app/group-application/entity/group-application.entity';
import { GroupApplicationService } from '@src/app/group-application/group-application.service';

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
      groupArticleRquest.contents = 'Hello';
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

    test('모집게시글을 등록할 때 contents를 적지 않으면 400 에러를 던진다.', async () => {
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
      expect(result.status).toEqual(400);
    });

    test('모집게시글을 등록할 때 타이틀이 0자면 400 에러를 보낸다.', async () => {
      // given
      const jwtService = app.get(JwtTokenService);
      const user = await dataSource.getRepository(User).findOneBy({ id: 1 });
      const accessToken = jwtService.generateAccessToken(user);
      const groupArticleRquest = new GroupArticleRegisterRequest();
      groupArticleRquest.title = '';
      groupArticleRquest.contents = 'Hello';
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
      groupArticleRquest.contents = 'Hello';
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
          contents: 'Hello',
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
          contents: 'Hello',
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
      groupArticleRquest.contents = 'Hello';
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

  describe('모집 게시글 모집 중단 POST /group-articles/:id/recruitment-cancel', () => {
    const url = (id: number) => `/v1/group-articles/${id}/recruitment-cancel`;

    test('모집게시글의 상태를 정상적으로 모집 취소로 바꾼다면 204 코드를 던진다.', async () => {
      // given
      const jwtService = app.get(JwtTokenService);
      const user = await dataSource.getRepository(User).findOneBy({ id: 1 });
      const accessToken = jwtService.generateAccessToken(user);
      const groupArticleId = 1;

      // when
      const result = await request(app.getHttpServer())
        .post(url(groupArticleId))
        .set({ Cookie: setCookie(accessToken.accessToken) });

      // then
      expect(result.status).toEqual(204);
    });

    test('모집게시글의 상태가 이미 모집완료라면 400 코드를 던진다.', async () => {
      // given
      const jwtService = app.get(JwtTokenService);
      const user = await dataSource.getRepository(User).findOneBy({ id: 1 });
      const accessToken = jwtService.generateAccessToken(user);

      const groupArticleId = 1;
      const groupAriticleRepository = dataSource.getRepository(GroupArticle);
      const groupArticle = await groupAriticleRepository.findOneBy({
        id: groupArticleId,
      });
      groupArticle.complete(user);
      await groupAriticleRepository.save(groupArticle);

      // when
      const result = await request(app.getHttpServer())
        .post(url(groupArticleId))
        .set({ Cookie: setCookie(accessToken.accessToken) });

      // then
      expect(result.status).toEqual(400);
    });

    test('모집게시글의 상태가 이미 모집취소 상태라면 400 코드를 던진다.', async () => {
      // given
      const jwtService = app.get(JwtTokenService);
      const user = await dataSource.getRepository(User).findOneBy({ id: 1 });
      const accessToken = jwtService.generateAccessToken(user);

      const groupArticleId = 1;
      const groupAriticleRepository = dataSource.getRepository(GroupArticle);
      const groupArticle = await groupAriticleRepository.findOneBy({
        id: groupArticleId,
      });
      groupArticle.cancel(user);
      await groupAriticleRepository.save(groupArticle);

      // when
      const result = await request(app.getHttpServer())
        .post(url(groupArticleId))
        .set({ Cookie: setCookie(accessToken.accessToken) });

      // then
      expect(result.status).toEqual(400);
    });

    test('JWT 토큰이 없을 때 401 에러를 던진다.', async () => {
      // given
      const groupArticleId = 1;

      // when
      const result = await request(app.getHttpServer()).post(
        url(groupArticleId),
      );

      // then
      expect(result.status).toEqual(401);
    });

    test('글 작성자가 아닌 다른 유저가 모집 상태를 바꾸려고 하면 403 코드를 던진다.', async () => {
      // given
      const jwtService = app.get(JwtTokenService);
      const user = await dataSource.getRepository(User).findOneBy({ id: 2 });
      const accessToken = jwtService.generateAccessToken(user);
      const groupArticleId = 1;

      // when
      const result = await request(app.getHttpServer())
        .post(url(groupArticleId))
        .set({ Cookie: setCookie(accessToken.accessToken) });

      // then
      expect(result.status).toEqual(403);
    });

    test('아이디에 해당하는 모집게시글이 없다면 404 코드를 던진다.', async () => {
      // given
      const jwtService = app.get(JwtTokenService);
      const user = await dataSource.getRepository(User).findOneBy({ id: 1 });
      const accessToken = jwtService.generateAccessToken(user);
      const groupArticleId = 10000;

      // when
      const result = await request(app.getHttpServer())
        .post(url(groupArticleId))
        .set({ Cookie: setCookie(accessToken.accessToken) });

      // then
      expect(result.status).toEqual(404);
    });
  });

  describe('모집 게시글 모집 완료 POST /group-articles/:id/recruitment-complete', () => {
    const url = (id: number) => `/v1/group-articles/${id}/recruitment-complete`;

    test('모집게시글의 상태를 정상적으로 모집 완료로 바꾼다면 204 코드를 던진다.', async () => {
      // given
      const jwtService = app.get(JwtTokenService);
      const user = await dataSource.getRepository(User).findOneBy({ id: 1 });
      const accessToken = jwtService.generateAccessToken(user);
      const groupArticleId = 1;

      // when
      const result = await request(app.getHttpServer())
        .post(url(groupArticleId))
        .set({ Cookie: setCookie(accessToken.accessToken) });

      // then
      expect(result.status).toEqual(204);
    });

    test('모집게시글의 상태가 이미 모집완료라면 400 코드를 던진다.', async () => {
      // given
      const jwtService = app.get(JwtTokenService);
      const user = await dataSource.getRepository(User).findOneBy({ id: 1 });
      const accessToken = jwtService.generateAccessToken(user);

      const groupArticleId = 1;
      const groupAriticleRepository = dataSource.getRepository(GroupArticle);
      const groupArticle = await groupAriticleRepository.findOneBy({
        id: groupArticleId,
      });
      groupArticle.complete(user);
      await groupAriticleRepository.save(groupArticle);

      // when
      const result = await request(app.getHttpServer())
        .post(url(groupArticleId))
        .set({ Cookie: setCookie(accessToken.accessToken) });

      // then
      expect(result.status).toEqual(400);
    });

    test('모집게시글의 상태가 이미 모집취소 상태라면 400 코드를 던진다.', async () => {
      // given
      const jwtService = app.get(JwtTokenService);
      const user = await dataSource.getRepository(User).findOneBy({ id: 1 });
      const accessToken = jwtService.generateAccessToken(user);

      const groupArticleId = 1;
      const groupAriticleRepository = dataSource.getRepository(GroupArticle);
      const groupArticle = await groupAriticleRepository.findOneBy({
        id: groupArticleId,
      });
      groupArticle.cancel(user);
      await groupAriticleRepository.save(groupArticle);

      // when
      const result = await request(app.getHttpServer())
        .post(url(groupArticleId))
        .set({ Cookie: setCookie(accessToken.accessToken) });

      // then
      expect(result.status).toEqual(400);
    });

    test('JWT 토큰이 없을 때 401 에러를 던진다.', async () => {
      // given
      const groupArticleId = 1;

      // when
      const result = await request(app.getHttpServer()).post(
        url(groupArticleId),
      );

      // then
      expect(result.status).toEqual(401);
    });

    test('글 작성자가 아닌 다른 유저가 모집 상태를 바꾸려고 하면 403 코드를 던진다.', async () => {
      // given
      const jwtService = app.get(JwtTokenService);
      const user = await dataSource.getRepository(User).findOneBy({ id: 2 });
      const accessToken = jwtService.generateAccessToken(user);
      const groupArticleId = 1;

      // when
      const result = await request(app.getHttpServer())
        .post(url(groupArticleId))
        .set({ Cookie: setCookie(accessToken.accessToken) });

      // then
      expect(result.status).toEqual(403);
    });

    test('아이디에 해당하는 모집게시글이 없다면 404 코드를 던진다.', async () => {
      // given
      const jwtService = app.get(JwtTokenService);
      const user = await dataSource.getRepository(User).findOneBy({ id: 1 });
      const accessToken = jwtService.generateAccessToken(user);
      const groupArticleId = 10000;

      // when
      const result = await request(app.getHttpServer())
        .post(url(groupArticleId))
        .set({ Cookie: setCookie(accessToken.accessToken) });

      // then
      expect(result.status).toEqual(404);
    });
  });

  describe('모집 게시글 수정 PUT /group-articles/:id', () => {
    const url = (id: number) => `/v1/group-articles/${id}`;

    test('모집게시글을 정상적으로 수정하면 204 코드를 던진다.', async () => {
      // given
      const jwtService = app.get(JwtTokenService);
      const user = await dataSource.getRepository(User).findOneBy({ id: 1 });
      const accessToken = jwtService.generateAccessToken(user);
      const updateGroupArticleRequest = new UpdateGroupArticleRequest();
      updateGroupArticleRequest.title = 'CS 스터디';
      updateGroupArticleRequest.contents = 'Hello';
      updateGroupArticleRequest.thumbnail =
        'https://kr.object.ncloudstorage.com/moyeo-images/uploads/images/1669282011949-761671c7-cc43-4cee-bcb5-4bf3fea9478b.png';
      updateGroupArticleRequest.chatUrl = '채팅 url';
      const groupArticleId = 1;

      // when
      const result = await request(app.getHttpServer())
        .put(url(groupArticleId))
        .set({ Cookie: setCookie(accessToken.accessToken) })
        .send(updateGroupArticleRequest);

      // then
      expect(result.status).toEqual(204);
    });

    test('모집게시글을 수정할 때 제목이 없으면 400 코드를 던진다.', async () => {
      // given
      const jwtService = app.get(JwtTokenService);
      const user = await dataSource.getRepository(User).findOneBy({ id: 1 });
      const accessToken = jwtService.generateAccessToken(user);
      const updateGroupArticleRequest = new UpdateGroupArticleRequest();
      updateGroupArticleRequest.title = '';
      updateGroupArticleRequest.contents = 'Hello';
      updateGroupArticleRequest.thumbnail =
        'https://kr.object.ncloudstorage.com/moyeo-images/uploads/images/1669282011949-761671c7-cc43-4cee-bcb5-4bf3fea9478b.png';
      updateGroupArticleRequest.chatUrl = '채팅 url';
      const groupArticleId = 1;

      // when
      const result = await request(app.getHttpServer())
        .put(url(groupArticleId))
        .set({ Cookie: setCookie(accessToken.accessToken) })
        .send(updateGroupArticleRequest);

      // then
      expect(result.status).toEqual(400);
    });

    test('모집게시글을 수정할 때 콘텐츠가 없으면 400 코드를 던진다.', async () => {
      // given
      const jwtService = app.get(JwtTokenService);
      const user = await dataSource.getRepository(User).findOneBy({ id: 1 });
      const accessToken = jwtService.generateAccessToken(user);
      const updateGroupArticleRequest = new UpdateGroupArticleRequest();
      updateGroupArticleRequest.title = 'CS 스터디';
      updateGroupArticleRequest.contents = '';
      updateGroupArticleRequest.thumbnail =
        'https://kr.object.ncloudstorage.com/moyeo-images/uploads/images/1669282011949-761671c7-cc43-4cee-bcb5-4bf3fea9478b.png';
      updateGroupArticleRequest.chatUrl = '채팅 url';
      const groupArticleId = 1;

      // when
      const result = await request(app.getHttpServer())
        .put(url(groupArticleId))
        .set({ Cookie: setCookie(accessToken.accessToken) })
        .send(updateGroupArticleRequest);

      // then
      expect(result.status).toEqual(400);
    });

    test('모집게시글을 수정할 때 썸네일이 없으면 400 코드를 던진다.', async () => {
      // given
      const jwtService = app.get(JwtTokenService);
      const user = await dataSource.getRepository(User).findOneBy({ id: 1 });
      const accessToken = jwtService.generateAccessToken(user);
      const updateGroupArticleRequest = new UpdateGroupArticleRequest();
      updateGroupArticleRequest.title = 'CS 스터디';
      updateGroupArticleRequest.contents = 'Hello';
      updateGroupArticleRequest.thumbnail = '';
      updateGroupArticleRequest.chatUrl = '채팅 url';
      const groupArticleId = 1;

      // when
      const result = await request(app.getHttpServer())
        .put(url(groupArticleId))
        .set({ Cookie: setCookie(accessToken.accessToken) })
        .send(updateGroupArticleRequest);

      // then
      expect(result.status).toEqual(400);
    });

    test('모집게시글을 수정할 때 채팅 URL이 없으면 400 코드를 던진다.', async () => {
      // given
      const jwtService = app.get(JwtTokenService);
      const user = await dataSource.getRepository(User).findOneBy({ id: 1 });
      const accessToken = jwtService.generateAccessToken(user);
      const updateGroupArticleRequest = new UpdateGroupArticleRequest();
      updateGroupArticleRequest.title = 'CS 스터디';
      updateGroupArticleRequest.contents = 'Hello';
      updateGroupArticleRequest.thumbnail =
        'https://kr.object.ncloudstorage.com/moyeo-images/uploads/images/1669282011949-761671c7-cc43-4cee-bcb5-4bf3fea9478b.png';
      updateGroupArticleRequest.chatUrl = '';
      const groupArticleId = 1;

      // when
      const result = await request(app.getHttpServer())
        .put(url(groupArticleId))
        .set({ Cookie: setCookie(accessToken.accessToken) })
        .send(updateGroupArticleRequest);

      // then
      expect(result.status).toEqual(400);
    });

    test('JWT 토큰이 없을 때 401 에러를 던진다.', async () => {
      // given
      const groupArticleId = 1;

      // when
      const result = await request(app.getHttpServer()).put(
        url(groupArticleId),
      );

      // then
      expect(result.status).toEqual(401);
    });

    test('모집게시글을 수정할 때 작성자가 아니라면 403 코드를 던진다.', async () => {
      // given
      const jwtService = app.get(JwtTokenService);
      const user = await dataSource.getRepository(User).findOneBy({ id: 2 });
      const accessToken = jwtService.generateAccessToken(user);
      const updateGroupArticleRequest = new UpdateGroupArticleRequest();
      updateGroupArticleRequest.title = 'CS 스터디';
      updateGroupArticleRequest.contents = 'Hello';
      updateGroupArticleRequest.thumbnail =
        'https://kr.object.ncloudstorage.com/moyeo-images/uploads/images/1669282011949-761671c7-cc43-4cee-bcb5-4bf3fea9478b.png';
      updateGroupArticleRequest.chatUrl = 'chat url';
      const groupArticleId = 1;

      // when
      const result = await request(app.getHttpServer())
        .put(url(groupArticleId))
        .set({ Cookie: setCookie(accessToken.accessToken) })
        .send(updateGroupArticleRequest);

      // then
      expect(result.status).toEqual(403);
    });

    test('모집게시글을 수정할 때 없는 게시물에 접근하면 404 코드를 던진다.', async () => {
      // given
      const jwtService = app.get(JwtTokenService);
      const user = await dataSource.getRepository(User).findOneBy({ id: 1 });
      const accessToken = jwtService.generateAccessToken(user);
      const updateGroupArticleRequest = new UpdateGroupArticleRequest();
      updateGroupArticleRequest.title = 'CS 스터디';
      updateGroupArticleRequest.contents = 'Hello';
      updateGroupArticleRequest.thumbnail =
        'https://kr.object.ncloudstorage.com/moyeo-images/uploads/images/1669282011949-761671c7-cc43-4cee-bcb5-4bf3fea9478b.png';
      updateGroupArticleRequest.chatUrl = 'chat url';
      const groupArticleId = 10000;

      // when
      const result = await request(app.getHttpServer())
        .put(url(groupArticleId))
        .set({ Cookie: setCookie(accessToken.accessToken) })
        .send(updateGroupArticleRequest);

      // then
      expect(result.status).toEqual(404);
    });
  });

  describe('모집 게시글 단일 조회 GET /group-articles/:id', () => {
    const url = (id: number) => `/v1/group-articles/${id}`;

    test('모집게시글을 정상조회하면 200코드와 게시글 상세정보를 준다.', async () => {
      // given
      const jwtService = app.get(JwtTokenService);
      const user = await dataSource.getRepository(User).findOneBy({ id: 1 });
      const accessToken = jwtService.generateAccessToken(user);
      const groupArticleId = 1;

      const groupArticle = await dataSource
        .getRepository(GroupArticle)
        .findOneBy({ id: 1 });

      // when
      const result = await request(app.getHttpServer())
        .get(url(groupArticleId))
        .set({ Cookie: setCookie(accessToken.accessToken) });

      // then
      expect(result.status).toEqual(200);
      expect(result.body.data.id).toEqual(groupArticle.id);
      expect(result.body.data.title).toEqual(groupArticle.title);
      expect(result.body.data.contents).toEqual(groupArticle.contents);
      expect(result.body.data.author).toEqual({
        id: user.id,
        userName: user.userName,
        profileImage: user.profileImage,
      });
      expect(result.body.data.category).toEqual(
        groupArticle.group.category.name,
      );
      expect(result.body.data.location).toEqual(groupArticle.group.location);
      expect(result.body.data.thumbnail).toEqual(groupArticle.group.thumbnail);
      expect(result.body.data.status).toEqual(groupArticle.group.status);
    });

    test('JWT 토큰이 없을 때 401 에러를 던진다.', async () => {
      // given
      const groupArticleId = 1;

      // when
      const result = await request(app.getHttpServer()).get(
        url(groupArticleId),
      );

      // then
      expect(result.status).toEqual(401);
    });

    test('해당하는 모집 게시글이 존재하지 않는다면 404코드를 준다.', async () => {
      // given
      const jwtService = app.get(JwtTokenService);
      const user = await dataSource.getRepository(User).findOneBy({ id: 1 });
      const accessToken = jwtService.generateAccessToken(user);
      const groupArticleId = 10000;

      // when
      const result = await request(app.getHttpServer())
        .get(url(groupArticleId))
        .set({ Cookie: setCookie(accessToken.accessToken) });

      // then
      expect(result.status).toEqual(404);
    });
  });

  describe('모집 게시글 채팅방 URL 조회 GET /group-articles/:id/chat-url', () => {
    const url = (id: number) => `/v1/group-articles/${id}/chat-url`;

    test('모집게시글이 모집 완료된 상태로 Chat URL을 정상조회하면 200코드와 채팅 URL을 전달한다.', async () => {
      // given
      const jwtService = app.get(JwtTokenService);
      const userRepository = dataSource.getRepository(User);
      const author = await userRepository.findOneBy({ id: 1 });
      const user = await userRepository.findOneBy({ id: 2 });
      const accessToken = jwtService.generateAccessToken(user);

      const groupArticleId = 2;
      const groupApplicationService = app.get(GroupApplicationService);
      await groupApplicationService.joinGroup(user, groupArticleId);

      const groupArticleRepository = dataSource.getRepository(GroupArticle);
      const groupArticle = await groupArticleRepository.findOneBy({
        id: groupArticleId,
      });
      groupArticle.complete(author);
      await groupArticleRepository.save(groupArticle);

      // when
      const result = await request(app.getHttpServer())
        .get(url(groupArticleId))
        .set({ Cookie: setCookie(accessToken.accessToken) });

      // then
      expect(result.status).toEqual(200);
      expect(result.body.data.chatUrl).toEqual(groupArticle.group.chatUrl);
    });

    test('모임게시글이 아직 모집 중이라면 400코드를 준다.', async () => {
      // given
      const jwtService = app.get(JwtTokenService);
      const user = await dataSource.getRepository(User).findOneBy({ id: 1 });
      const accessToken = jwtService.generateAccessToken(user);
      const groupArticleId = 1;

      // when
      const result = await request(app.getHttpServer())
        .get(url(groupArticleId))
        .set({ Cookie: setCookie(accessToken.accessToken) });

      // then
      expect(result.status).toEqual(400);
    });

    test('모임게시글이 모집 실패 상태라면 400코드를 준다.', async () => {
      // given
      const jwtService = app.get(JwtTokenService);
      const user = await dataSource.getRepository(User).findOneBy({ id: 1 });
      const accessToken = jwtService.generateAccessToken(user);
      const groupArticleId = 1;

      const groupArticleRepository = dataSource.getRepository(GroupArticle);
      const groupArticle = await groupArticleRepository.findOneBy({ id: 1 });
      groupArticle.cancel(user);
      await groupArticleRepository.save(groupArticle);

      // when
      const result = await request(app.getHttpServer())
        .get(url(groupArticleId))
        .set({ Cookie: setCookie(accessToken.accessToken) });

      // then
      expect(result.status).toEqual(400);
    });

    test('JWT 토큰이 없을 때 401 에러를 던진다.', async () => {
      // given
      const groupArticleId = 1;

      // when
      const result = await request(app.getHttpServer()).get(
        url(groupArticleId),
      );

      // then
      expect(result.status).toEqual(401);
    });

    test('모집게시글의 참가자가 아니라면 403 코드를 던진다.', async () => {
      // given
      const jwtService = app.get(JwtTokenService);
      const author = await dataSource.getRepository(User).findOneBy({ id: 1 });
      const user = await dataSource.getRepository(User).findOneBy({ id: 2 });
      const accessToken = jwtService.generateAccessToken(user);
      const groupArticleId = 1;

      const groupArticleRepository = dataSource.getRepository(GroupArticle);
      const groupArticle = await groupArticleRepository.findOneBy({ id: 1 });
      groupArticle.complete(author);
      await groupArticleRepository.save(groupArticle);

      // when
      const result = await request(app.getHttpServer())
        .get(url(groupArticleId))
        .set({ Cookie: setCookie(accessToken.accessToken) });

      // then
      expect(result.status).toEqual(403);
    });

    test('해당하는 모집 게시글이 존재하지 않는다면 404코드를 준다.', async () => {
      // given
      const jwtService = app.get(JwtTokenService);
      const user = await dataSource.getRepository(User).findOneBy({ id: 1 });
      const accessToken = jwtService.generateAccessToken(user);
      const groupArticleId = 10000;

      // when
      const result = await request(app.getHttpServer())
        .get(url(groupArticleId))
        .set({ Cookie: setCookie(accessToken.accessToken) });

      // then
      expect(result.status).toEqual(404);
    });
  });

  describe('모집게시글 카테고리 조회 GET /group-articles/categories', () => {
    const url = () => `/v1/group-articles/categories`;

    test('카테고리를 정상 조회하면 200 OK와 카테고리 정보를 던져준다.', async () => {
      // given
      const jwtService = app.get(JwtTokenService);
      const userRepository = dataSource.getRepository(User);
      const user = await userRepository.findOneBy({ id: 1 });
      const accessToken = jwtService.generateAccessToken(user);

      // when
      const result = await request(app.getHttpServer())
        .get(url())
        .set({ Cookie: setCookie(accessToken.accessToken) });

      // then
      expect(result.status).toEqual(200);
      expect(result.body.data[0]).toEqual({
        id: 1,
        name: 'MEAL',
      });
      expect(result.body.data[1]).toEqual({
        id: 2,
        name: 'STUDY',
      });
      expect(result.body.data[2]).toEqual({
        id: 3,
        name: 'ETC',
      });
      expect(result.body.data[3]).toEqual({
        id: 4,
        name: 'COMPETITION',
      });
      expect(result.body.data[4]).toEqual({
        id: 5,
        name: 'PROJECT',
      });
    });

    test('JWT 토큰이 없어도 200 OK와 카테고리 데이터를 준다.', async () => {
      // given

      // when
      const result = await request(app.getHttpServer()).get(url());

      // then
      expect(result.status).toEqual(200);
      expect(result.body.data[0]).toEqual({
        id: 1,
        name: 'MEAL',
      });
      expect(result.body.data[1]).toEqual({
        id: 2,
        name: 'STUDY',
      });
      expect(result.body.data[2]).toEqual({
        id: 3,
        name: 'ETC',
      });
      expect(result.body.data[3]).toEqual({
        id: 4,
        name: 'COMPETITION',
      });
      expect(result.body.data[4]).toEqual({
        id: 5,
        name: 'PROJECT',
      });
    });
  });
});
