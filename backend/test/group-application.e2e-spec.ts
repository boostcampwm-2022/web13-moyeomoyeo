import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '@src/app.module';
import { GroupArticle } from '@src/app/group-article/entity/group-article.entity';
import { GroupCategory } from '@src/app/group-article/entity/group-category.entity';
import { getGroupArticleFixture } from '@src/app/group-article/__test__/group-article.fixture';
import { getGroupCategoryFixture } from '@src/app/group-article/__test__/group-category.fixture';
import { getGroupFixture } from '@src/app/group-article/__test__/group.fixture';
import { User } from '@src/app/user/entity/user.entity';
import { getUserFixture } from '@src/app/user/__test__/user.fixture';
import { setNestApp } from '@src/setNestApp';
import { DataSource } from 'typeorm';
import * as request from 'supertest';
import { JwtTokenService } from '@src/common/module/jwt-token/jwt-token.service';
import { setCookie } from './utils/jwt-test.utils';

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
    await groupCategoryRepository.insert(categories);

    const userRepository = dataSource.getRepository(User);
    const user1 = getUserFixture({ id: 1 });
    const user2 = getUserFixture({ id: 2 });
    await userRepository.insert([user1, user2]);

    const group1 = getGroupFixture(categories[1], { maxCapacity: 2 });
    const group2 = getGroupFixture(categories[1]);

    const groupArticleRepository = dataSource.getRepository(GroupArticle);
    const user = await userRepository.findOneBy({ id: 1 });
    const groupArticle1 = await getGroupArticleFixture(group1, {
      user: new Promise((res) => res(user)),
      userId: user.id,
    });
    const groupArticle2 = await getGroupArticleFixture(group2, {
      user: new Promise((res) => res(user)),
      userId: user.id,
    });
    await groupArticleRepository.save([groupArticle1, groupArticle2]);
  });

  afterEach(async () => {
    await dataSource.synchronize(true);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  describe('GET /v1/group-applications/status?groupArticleId={id}', () => {
    const url = (id: number) =>
      `/v1/group-applications/status?groupArticleId=${id}`;

    test('자신이 만든 모집게시글 참여여부 조회', async () => {
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

    test('내가 참여한 모임 참여여부 조회', async () => {
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

    test('신청하지 않은 모임 참여여부 조회', async () => {
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

    test('JWT 토큰이 없을 때', async () => {
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
});
