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
import { GroupApplicationRepository } from '@src/app/group-application/group-application.repository';

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

    const groupApplication1 = await getGroupApplicationRegisterFixture(
      groupArticle1.group,
      {
        id: 1,
        user: new Promise(async (res) => res(user1)),
        userId: user1.id,
      },
    );
    const groupApplication2 = await getGroupApplicationRegisterFixture(
      groupArticle2.group,
      {
        id: 2,
        user: new Promise(async (res) => res(user1)),
        userId: user1.id,
      },
    );
    await dataSource
      .getRepository(GroupApplication)
      .save([groupApplication1, groupApplication2]);
  });

  afterEach(async () => {
    await dataSource.synchronize(true);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  describe('?????? ?????? ?????? GET /v1/group-applications/status?groupArticleId={id}', () => {
    const url = (id: number) =>
      `/v1/group-applications/status?groupArticleId=${id}`;

    test('????????? ?????? ??????????????? ???????????? ?????? ??? 200 ????????? isJoined true??? ?????????.', async () => {
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

    test('?????? ????????? ?????? ???????????? ????????? ??? 200????????? isJoined true??? ?????????.', async () => {
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
        id: 3,
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

    test('???????????? ?????? ?????? ???????????? ????????? ??? 200 ????????? isJoined false??? ?????????.', async () => {
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

    test('JWT ????????? ?????? ??? 401 ????????? ?????????.', async () => {
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

  describe('?????? ???????????? POST /group-applications', () => {
    const url = () => `/v1/group-applications`;

    test('?????? ???????????? ?????? ?????? ??? 201 ????????? ?????????.', async () => {
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

    test('?????? ????????? ????????? ??? 400????????? ?????????.', async () => {
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
        id: 3,
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

    test('????????? ?????? ????????? ?????? ????????? ?????? 400 ????????? ?????????.', async () => {
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

    test('????????? ????????? ????????? ????????? ?????? ????????? ?????? 400 ????????? ?????????.', async () => {
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

    test('JWT ????????? ???????????? ?????? ??? 401????????? ?????????.', async () => {
      // given
      const groupArticleId = 1;

      // when
      const result = await request(app.getHttpServer()).post(url()).send({
        groupArticleId,
      });

      // then
      expect(result.status).toEqual(401);
    });

    test('???????????? ?????? ????????? ??????????????? ?????? 404 ????????? ?????????.', async () => {
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

  describe('????????? ?????? GET /group-applications/participants?groupArticleId={id}', () => {
    const url = (id: number) =>
      `/v1/group-applications/participants?groupArticleId=${id}`;

    test('?????? ???????????? ?????? ?????? ??? 200 ????????? ????????? ????????? ????????? ????????? ??? ??????.(???????????? ??? ???????????? ?????? ??????)', async () => {
      // given
      const jwtService = app.get(JwtTokenService);
      const userRepository = dataSource.getRepository(User);
      const user = await userRepository.findOneBy({ id: 2 });
      const accessToken = jwtService.generateAccessToken(user);
      const groupArticleId = 1;

      // when
      const result = await request(app.getHttpServer())
        .get(url(groupArticleId))
        .set({ Cookie: setCookie(accessToken.accessToken) });

      // then
      const groupArticle = await dataSource
        .getRepository(GroupArticle)
        .findOneBy({ id: groupArticleId });
      const group = groupArticle.group;
      const participantsApplications = await dataSource
        .getRepository(GroupApplication)
        .find({ where: { groupId: group.id }, relations: { user: true } });
      expect(result.status).toEqual(200);
      const testList = participantsApplications.map(
        async (participantsApplication, index) => {
          const participant = await participantsApplication.user;
          expect(result.body.data[index].user).toEqual({
            id: participant.id,
            userName: participant.userName,
            description: participant.description,
            profileImage: participant.profileImage,
          });
        },
      );
      Promise.all(testList);
    });

    test('?????? ???????????? ?????? ?????? ??? 200 ????????? ????????? ????????? ????????? ????????? ??? ??????.(????????? ???????????? ????????? ???????????? ??????)', async () => {
      // given
      const jwtService = app.get(JwtTokenService);
      const userRepository = dataSource.getRepository(User);
      const participant = await userRepository.findOneBy({ id: 2 });
      const groupArticleId = 1;
      const groupApplicationRepository =
        dataSource.getRepository(GroupApplication);
      const groupArticleRepository = dataSource.getRepository(GroupArticle);
      const groupArticle = await groupArticleRepository.findOneBy({
        id: groupArticleId,
      });
      const group = groupArticle.group;
      const groupApplication = await getGroupApplicationRegisterFixture(group, {
        id: 3,
        user: new Promise(async (res) => res(participant)),
        userId: participant.id,
      });
      await groupApplicationRepository.save(groupApplication);
      const accessToken = jwtService.generateAccessToken(participant);

      // when
      const result = await request(app.getHttpServer())
        .get(url(groupArticleId))
        .set({ Cookie: setCookie(accessToken.accessToken) });

      // then
      const participantsApplications = await dataSource
        .getRepository(GroupApplication)
        .find({ where: { groupId: group.id }, relations: { user: true } });
      expect(result.status).toEqual(200);
      const testList = participantsApplications.map(
        async (participantsApplication, index) => {
          const participant = await participantsApplication.user;
          expect(result.body.data[index].user).toEqual({
            id: participant.id,
            userName: participant.userName,
            description: participant.description,
            profileImage: participant.profileImage,
          });
        },
      );
      Promise.all(testList);
    });

    test('JWT ????????? ???????????? ?????? ??? 401????????? ?????????.', async () => {
      // given
      const groupArticleId = 1;

      // when
      const result = await request(app.getHttpServer()).get(
        url(groupArticleId),
      );

      // then
      expect(result.status).toEqual(401);
    });

    test('?????? ???????????? ?????? ?????? ??? 200 ????????? ????????? ????????? ????????? ????????? ??? ??????.(???????????? ?????? ??? ?????? ????????? ???????????? ??????)', async () => {
      // given
      const jwtService = app.get(JwtTokenService);
      const userRepository = dataSource.getRepository(User);
      const participant = await userRepository.findOneBy({ id: 2 });
      const groupArticleId = 1;
      const groupApplicationRepository =
        dataSource.getRepository(GroupApplication);
      const groupArticleRepository = dataSource.getRepository(GroupArticle);
      const groupArticle = await groupArticleRepository.findOneBy({
        id: groupArticleId,
      });
      const group = groupArticle.group;
      const groupApplication = await getGroupApplicationRegisterFixture(group, {
        id: 3,
        user: new Promise(async (res) => res(participant)),
        userId: participant.id,
      });
      await groupApplicationRepository.save(groupApplication);

      // ???????????? ??????
      const visitor = getUserFixture({ id: 3 });
      await userRepository.save(visitor);
      const accessToken = jwtService.generateAccessToken(visitor);

      // when
      const result = await request(app.getHttpServer())
        .get(url(groupArticleId))
        .set({ Cookie: setCookie(accessToken.accessToken) });

      // then
      const participantsApplications = await dataSource
        .getRepository(GroupApplication)
        .find({ where: { groupId: group.id }, relations: { user: true } });
      expect(result.status).toEqual(200);
      const testList = participantsApplications.map(
        async (participantsApplication, index) => {
          const participant = await participantsApplication.user;
          expect(result.body.data[index].user).toEqual({
            id: participant.id,
            userName: participant.userName,
            description: participant.description,
            profileImage: participant.profileImage,
          });
        },
      );
      Promise.all(testList);
    });

    test('JWT ????????? ???????????? ?????? ??? 401????????? ?????????.', async () => {
      // given
      const groupArticleId = 1;

      // when
      const result = await request(app.getHttpServer()).get(
        url(groupArticleId),
      );

      // then
      expect(result.status).toEqual(401);
    });

    test('???????????? ?????? ????????? ??????????????? ?????? 404 ????????? ?????????.', async () => {
      // given
      const jwtService = app.get(JwtTokenService);
      const user = await dataSource.getRepository(User).findOneBy({ id: 2 });
      const accessToken = jwtService.generateAccessToken(user);
      const groupArticleId = 1000;

      // when
      const result = await request(app.getHttpServer())
        .get(url(groupArticleId))
        .set({ Cookie: setCookie(accessToken.accessToken) });

      // then
      expect(result.status).toEqual(404);
    });
  });

  describe('?????? ?????? POST /group-applications/cancel', () => {
    const url = () => `/v1/group-applications/cancel`;

    test('?????? ????????? ????????? ?????? ????????? ?????? 204????????? ?????????.', async () => {
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
        id: 3,
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

    test('?????? ????????? ??????????????? ????????? ????????? ??? ?????? ????????? ?????? 400 ????????? ?????????.', async () => {
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
        id: 3,
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

    test('????????? ?????? ??????????????? ???????????? ?????? ??? 400 ????????? ?????????.', async () => {
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

    test('JWT ????????? ???????????? ?????? ??? 401????????? ?????????.', async () => {
      // given
      const groupArticleId = 1;

      // when
      const result = await request(app.getHttpServer())
        .post(url())
        .send({ groupArticleId });

      // then
      expect(result.status).toEqual(401);
    });

    test('?????? ????????? ?????? ????????? ?????? 404????????? ?????????.', async () => {
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

    test('?????? ????????? ?????? ?????? ????????? ?????? ????????? ?????? 404????????? ?????????.', async () => {
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

  describe('?????? ????????? ?????? ?????? GET /group-applications/me', () => {
    const url = () => `/v1/group-applications/me`;

    test('?????? ????????? ????????? ?????? ????????? ??? 200 ????????? ?????????.', async () => {
      // given
      const userRepository = dataSource.getRepository(User);
      const groupArticleRepository = dataSource.getRepository(GroupArticle);
      const groupApplicationRepository = app.get(GroupApplicationRepository);
      const categoryRepository = dataSource.getRepository(GroupCategory);

      const newAuthor1 = getUserFixture({ id: 3 });
      const newAuthor2 = getUserFixture({ id: 4 });
      await userRepository.save([newAuthor1, newAuthor2]);
      const category = await categoryRepository.findOneBy({ id: 1 });
      const group1 = getGroupFixture(category, { id: 3 });
      const group2 = getGroupFixture(category, { id: 4 });
      const groupArticle1 = await getGroupArticleFixture(group1, {
        id: 3,
        user: new Promise((res) => res(newAuthor1)),
        userId: newAuthor1.id,
      });
      const groupArticle2 = await getGroupArticleFixture(group2, {
        id: 4,
        user: new Promise((res) => res(newAuthor2)),
        userId: newAuthor2.id,
      });
      await groupArticleRepository.save([groupArticle1, groupArticle2]);

      const groupApplication1 = await getGroupApplicationRegisterFixture(
        groupArticle1.group,
        {
          id: 3,
          user: new Promise(async (res) => res(newAuthor1)),
          userId: newAuthor1.id,
        },
      );
      const groupApplication2 = await getGroupApplicationRegisterFixture(
        groupArticle2.group,
        {
          id: 4,
          user: new Promise(async (res) => res(newAuthor2)),
          userId: newAuthor2.id,
        },
      );
      await dataSource
        .getRepository(GroupApplication)
        .save([groupApplication1, groupApplication2]);

      const jwtService = app.get(JwtTokenService);
      const user = await userRepository.findOneBy({ id: 2 });
      const accessToken = jwtService.generateAccessToken(user);

      const firstArticle = await groupArticleRepository.findOneBy({ id: 1 });
      const userApplication1 = await getGroupApplicationRegisterFixture(
        groupArticle1.group,
        {
          id: 5,
          user: new Promise(async (res) => res(user)),
          userId: user.id,
        },
      );
      const userApplication2 = await getGroupApplicationRegisterFixture(
        firstArticle.group,
        {
          id: 6,
          user: new Promise(async (res) => res(user)),
          userId: user.id,
        },
      );
      await groupApplicationRepository.save([
        userApplication1,
        userApplication2,
      ]);

      // when
      const result = await request(app.getHttpServer())
        .get(url())
        .set({ Cookie: setCookie(accessToken.accessToken) });

      // then
      const limit = 5;
      const offset = 0;
      const articleList = await groupApplicationRepository.findMyGroup({
        userId: user.id,
        limit,
        offset,
      });
      expect(result.status).toEqual(200);
      expect(result.body.data.data.length).toEqual(2);
      articleList.result.forEach((article, index) => {
        expect(result.body.data.data[index]).toEqual({
          category: article.category,
          commentCount: article.commentCount,
          createdAt: article.createdAt.toISOString(),
          currentCapacity: Number(article.currentCapacity),
          id: article.groupArticleId,
          location: article.location,
          maxCapacity: article.maxCapacity,
          scrapCount: article.scrapCount,
          status: article.status,
          thumbnail: {
            blurUrl: article.thumbnail,
            originUrl: article.thumbnail,
          },
          title: article.title,
        });
      });
    });

    test('JWT ????????? ???????????? ?????? ??? 401????????? ?????????.', async () => {
      // given
      // when
      const result = await request(app.getHttpServer()).get(url());

      // then
      expect(result.status).toEqual(401);
    });
  });
});
