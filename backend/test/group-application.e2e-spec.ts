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
import { GroupApplication } from '@app/group-application/entity/group-application.entity';
import { getGroupApplicationRegisterFixture } from '@app/group-application/__test__/group-application.fixture';
import { GROUP_STATUS } from '@app/group-article/constants/group-article.constants';
import { Group } from '@app/group-article/entity/group.entity';

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

  describe('신청 여부 조회 GET /v1/group-applications/status?groupArticleId={id}', () => {
    const url = (id: number) =>
      `/v1/group-applications/status?groupArticleId=${id}`;

    test('자신이 만든 모집게시글 참여여부 조회 시 200 코드와 isJoined true를 던진다.', async () => {
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
      expect(result.status).toEqual(200);
      expect(result.body.data.isJoined).toEqual(true);
    });

    test('내가 참여한 모임 참여여부 조회할 시 200코드와 isJoined true를 던진다.', async () => {
      // given
      const jwtService = app.get(JwtTokenService);
      const user = await dataSource.getRepository(User).findOneBy({ id: 2 });
      const accessToken = jwtService.generateAccessToken(user);

      const groupApplicationRepository =
        dataSource.getRepository(GroupApplication);
      const groupArticleRepository = dataSource.getRepository(GroupArticle);
      const groupArticleId = 1;
      const groupArticle = await groupArticleRepository.findOneBy({
        id: groupArticleId,
      });
      const group = groupArticle.group;

      const groupApplication = await getGroupApplicationRegisterFixture(group, {
        id: 1,
        user: new Promise(async (res) => res(user)),
        userId: user.id,
      });
      await groupApplicationRepository.save(groupApplication);

      // when
      const result = await request(app.getHttpServer())
        .get(url(groupArticleId))
        .set({ Cookie: setCookie(accessToken.accessToken) });

      // then
      expect(result.status).toEqual(200);
      expect(result.body.data.isJoined).toEqual(true);
    });

    test('신청하지 않은 모임 참여여부 조회할 시 200 코드와 isJoined false를 던진다.', async () => {
      // given
      const jwtService = app.get(JwtTokenService);
      const user = await dataSource.getRepository(User).findOneBy({ id: 2 });
      const accessToken = jwtService.generateAccessToken(user);
      const groupArticleId = 1;

      // when
      const result = await request(app.getHttpServer())
        .get(url(groupArticleId))
        .set({ Cookie: setCookie(accessToken.accessToken) });

      // then
      expect(result.status).toEqual(200);
      expect(result.body.data.isJoined).toEqual(false);
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
  });

  describe('모집 신청하기 POST /group-applications', () => {
    const url = () => `/v1/group-applications`;

    test('모집 신청하기 정상 작동 시 201 코드를 던진다.', async () => {
      // given
      const jwtService = app.get(JwtTokenService);
      const user = await dataSource.getRepository(User).findOneBy({ id: 2 });
      const accessToken = jwtService.generateAccessToken(user);
      const groupArticleId = 1;

      // when
      const result = await request(app.getHttpServer())
        .post(url())
        .send({
          groupArticleId,
        })
        .set({ Cookie: setCookie(accessToken.accessToken) });

      // then
      const groupArticle = await dataSource
        .getRepository(GroupArticle)
        .findOneBy({ id: groupArticleId });
      const application = await dataSource
        .getRepository(GroupApplication)
        .findOneBy({ userId: user.id, groupId: groupArticle.group.id });

      expect(result.status).toEqual(201);
      expect(result.body.data.id).toEqual(application.id);
    });

    test('이미 신청된 유저일 때 400에러를 던진다.', async () => {
      // given
      const jwtService = app.get(JwtTokenService);
      const user = await dataSource.getRepository(User).findOneBy({ id: 2 });
      const accessToken = jwtService.generateAccessToken(user);

      const groupApplicationRepository =
        dataSource.getRepository(GroupApplication);
      const groupArticleRepository = dataSource.getRepository(GroupArticle);
      const groupArticleId = 1;
      const groupArticle = await groupArticleRepository.findOneBy({
        id: groupArticleId,
      });
      const group = groupArticle.group;

      const groupApplication = await getGroupApplicationRegisterFixture(group, {
        id: 1,
        user: new Promise(async (res) => res(user)),
        userId: user.id,
      });
      await groupApplicationRepository.save(groupApplication);

      // when
      const result = await request(app.getHttpServer())
        .post(url())
        .send({
          groupArticleId,
        })
        .set({ Cookie: setCookie(accessToken.accessToken) });

      // then
      expect(result.status).toEqual(400);
    });

    test('당신이 만든 그룹에 참가 신청을 하면 400 에러를 던진다.', async () => {
      // given
      const jwtService = app.get(JwtTokenService);
      const user = await dataSource.getRepository(User).findOneBy({ id: 1 });
      const accessToken = jwtService.generateAccessToken(user);
      const groupArticleId = 1;

      // when
      const result = await request(app.getHttpServer())
        .post(url())
        .send({
          groupArticleId,
        })
        .set({ Cookie: setCookie(accessToken.accessToken) });

      // then
      expect(result.status).toEqual(400);
    });

    test('모임이 모집이 마감된 그룹에 참가 신청을 하면 400 에러를 던진다.', async () => {
      // given
      const jwtService = app.get(JwtTokenService);
      const user = await dataSource.getRepository(User).findOneBy({ id: 2 });
      const accessToken = jwtService.generateAccessToken(user);

      const groupArticleRepository = dataSource.getRepository(GroupArticle);
      const groupRepository = dataSource.getRepository(Group);
      const groupArticleId = 1;
      const groupArticle = await groupArticleRepository.findOneBy({
        id: groupArticleId,
      });

      const group = groupArticle.group;
      group.status = GROUP_STATUS.FAIL;
      await groupRepository.save(group);

      // when
      const result = await request(app.getHttpServer())
        .post(url())
        .send({
          groupArticleId,
        })
        .set({ Cookie: setCookie(accessToken.accessToken) });

      // then
      expect(result.status).toEqual(400);
    });

    test('JWT 토큰이 존재하지 않을 때 401에러를 던진다.', async () => {
      // given
      const groupArticleId = 1;

      // when
      const result = await request(app.getHttpServer()).post(url()).send({
        groupArticleId,
      });

      // then
      expect(result.status).toEqual(401);
    });

    test('존재하지 않는 그룹에 참가신청을 하면 404 에러를 던진다.', async () => {
      // given
      const jwtService = app.get(JwtTokenService);
      const user = await dataSource.getRepository(User).findOneBy({ id: 2 });
      const accessToken = jwtService.generateAccessToken(user);
      const groupArticleId = 1000;

      // when
      const result = await request(app.getHttpServer())
        .post(url())
        .send({
          groupArticleId,
        })
        .set({ Cookie: setCookie(accessToken.accessToken) });

      // then
      expect(result.status).toEqual(404);
    });
  });

  describe('신청 취소 POST /group-applications/cancel', () => {
    const url = () => `/v1/group-applications/cancel`;

    test('내가 참여한 모임에 취소 신청을 하면 204코드를 받는다.', async () => {
      // given
      const jwtService = app.get(JwtTokenService);
      const user = await dataSource.getRepository(User).findOneBy({ id: 2 });
      const accessToken = jwtService.generateAccessToken(user);

      const groupApplicationRepository =
        dataSource.getRepository(GroupApplication);
      const groupArticleRepository = dataSource.getRepository(GroupArticle);
      const groupArticleId = 2;
      const groupArticle = await groupArticleRepository.findOneBy({
        id: groupArticleId,
      });
      const group = groupArticle.group;

      const groupApplication = await getGroupApplicationRegisterFixture(group, {
        id: 1,
        user: new Promise(async (res) => res(user)),
        userId: user.id,
      });
      await groupApplicationRepository.save(groupApplication);

      // when
      const result = await request(app.getHttpServer())
        .post(url())
        .send({ groupArticleId })
        .set({ Cookie: setCookie(accessToken.accessToken) });

      // then
      expect(result.status).toEqual(204);
    });

    test('내가 참여한 모임이지만 마감된 모집일 때 취소 신청을 하면 400 코드를 받는다.', async () => {
      // given
      const jwtService = app.get(JwtTokenService);
      const user = await dataSource.getRepository(User).findOneBy({ id: 2 });
      const accessToken = jwtService.generateAccessToken(user);

      const groupApplicationRepository =
        dataSource.getRepository(GroupApplication);
      const groupArticleRepository = dataSource.getRepository(GroupArticle);
      const groupArticleId = 1;
      const groupArticle = await groupArticleRepository.findOneBy({
        id: groupArticleId,
      });
      const group = groupArticle.group;
      group.status = GROUP_STATUS.SUCCEED;

      const groupApplication = await getGroupApplicationRegisterFixture(group, {
        id: 1,
        user: new Promise(async (res) => res(user)),
        userId: user.id,
      });
      await groupApplicationRepository.save(groupApplication);
      await groupArticleRepository.save(groupArticle);

      // when
      const result = await request(app.getHttpServer())
        .post(url())
        .send({ groupArticleId })
        .set({ Cookie: setCookie(accessToken.accessToken) });

      // then
      expect(result.status).toEqual(400);
    });

    test('자신이 만든 모집게시글 참여여부 조회 시 400 코드를 던진다.', async () => {
      // given
      const jwtService = app.get(JwtTokenService);
      const user = await dataSource.getRepository(User).findOneBy({ id: 1 });
      const accessToken = jwtService.generateAccessToken(user);
      const groupArticleId = 1;

      // when
      const result = await request(app.getHttpServer())
        .post(url())
        .send({ groupArticleId })
        .set({ Cookie: setCookie(accessToken.accessToken) });

      // then
      expect(result.status).toEqual(400);
    });

    test('JWT 토큰이 존재하지 않을 때 401에러를 던진다.', async () => {
      // given
      const groupArticleId = 1;

      // when
      const result = await request(app.getHttpServer())
        .post(url())
        .send({ groupArticleId });

      // then
      expect(result.status).toEqual(401);
    });

    test('없는 그룹에 취소 신청을 하면 404코드를 받는다.', async () => {
      // given
      const jwtService = app.get(JwtTokenService);
      const user = await dataSource.getRepository(User).findOneBy({ id: 2 });
      const accessToken = jwtService.generateAccessToken(user);
      const groupArticleId = 10000;

      // when
      const result = await request(app.getHttpServer())
        .post(url())
        .send({ groupArticleId })
        .set({ Cookie: setCookie(accessToken.accessToken) });

      // then
      expect(result.status).toEqual(404);
    });

    test('참가 신청을 하지 않은 그룹에 취소 신청을 하면 404코드를 받는다.', async () => {
      // given
      const jwtService = app.get(JwtTokenService);
      const user = await dataSource.getRepository(User).findOneBy({ id: 2 });
      const accessToken = jwtService.generateAccessToken(user);
      const groupArticleId = 2;

      // when
      const result = await request(app.getHttpServer())
        .post(url())
        .send({ groupArticleId })
        .set({ Cookie: setCookie(accessToken.accessToken) });

      // then
      expect(result.status).toEqual(404);
    });
  });
});
