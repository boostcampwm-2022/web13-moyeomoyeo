/* eslint-disable no-console */
import * as mysql2 from 'mysql2/promise';
import { faker } from '@faker-js/faker';
import {
  CATEGORY,
  GROUP_STATUS,
  LOCATION,
} from '../src/app/group-article/constants/group-article.constants';

function randomValue(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function bulkInsert() {
  let result = false;
  const conn = await mysql2.createConnection({
    host: 'localhost',
    port: 3330,
    password: 'test',
    database: 'test',
    user: 'root',
    timezone: 'Z',
  });

  const USER_COUNT = 30000;
  const GROUP_ARTICLE_COUNT = 50000;
  const DELETED_GROUP_ARTICLE_PERCENT = 5;

  const groupCategories = [
    CATEGORY.MEAL,
    CATEGORY.STUDY,
    CATEGORY.PROJECT,
    CATEGORY.COMPETITION,
    CATEGORY.ETC,
  ];
  const locations = [
    LOCATION.ONLINE,
    LOCATION.SEOUL,
    LOCATION.INCHEON,
    LOCATION.BUSAN,
    LOCATION.DAEGU,
    LOCATION.GWANGJU,
    LOCATION.DAEJEON,
    LOCATION.ULSAN,
    LOCATION.SEJONG,
    LOCATION.GYEONGGI,
    LOCATION.GANGWON,
    LOCATION.CHUNGBUK,
    LOCATION.CHUNGNAM,
    LOCATION.JEONBUK,
    LOCATION.JEONNAM,
    LOCATION.GYEONGBUK,
    LOCATION.GYEONGNAM,
    LOCATION.JEJU,
  ];
  const groupStatus = [
    GROUP_STATUS.PROGRESS,
    GROUP_STATUS.SUCCEED,
    GROUP_STATUS.FAIL,
  ];

  const GROUP_APPLICATION_COUNT = 200000;
  const DELETED_GROUP_APPLICATION_PERCENT = 15;
  const COMMENT_COUNT = 50000;
  const DELETED_COMMENT_PERCENT = 5;

  await conn.beginTransaction();
  try {
    console.log('유저 더미 데이터 생성 시작');
    const userValues = Array.from(
      { length: USER_COUNT },
      (v, k) =>
        `(${k + 1}, "${faker.internet.url()}","${faker.lorem.paragraph(
          1,
        )}", "${faker.internet.url()}", "${faker.internet.url()}", ${
          k + 1
        }, "GITHUB", "user${k + 1}")`,
    ).join(',');
    await conn.query(`INSERT INTO \`user\`(\`id\`, profile_image, description, github_url, blog_url, social_id,
                                           social_type, user_name)
                      VALUES ${userValues}`);
    console.log(`유저 더미 데이터 생성 완료: ${USER_COUNT}`);

    console.log('모임 카테고리 더미 데이터 생성 시작');
    const groupCategoryValues = groupCategories
      .map((category, idx) => `(${idx + 1}, "${category}")`)
      .join(',');

    await conn.query(`INSERT INTO group_category(\`id\`, \`name\`)
                      VALUES ${groupCategoryValues}`);
    console.log(
      `모임 카테고리 더미 데이터 생성 완료: ${groupCategories.length}`,
    );

    console.log('모집 게시글 더미 데이터 생성 시작');
    const articleValues = Array.from(
      { length: GROUP_ARTICLE_COUNT },
      (v, k) =>
        `(${k + 1},${randomValue(1, USER_COUNT)},"${faker.lorem.words(
          1,
        )}", "${faker.lorem.paragraphs(5)}","GROUP", ${
          (k + 1) % (100 / DELETED_GROUP_ARTICLE_PERCENT) === 0 ? 'now()' : null
        })`,
    ).join(',');

    await conn.query(`INSERT INTO article(\`id\`, user_id, title, contents, type, deleted_at)
                      VALUES ${articleValues}`);

    const groupValues = Array.from(
      { length: GROUP_ARTICLE_COUNT },
      (v, k) =>
        `(${k + 1}, ${k + 1}, ${randomValue(1, groupCategories.length - 1)}, "${
          locations[(k + 1) % locations.length]
        }", ${randomValue(2, 15)},"${
          groupStatus[(k + 1) % groupStatus.length]
        }","${faker.internet.url()}", "${faker.internet.url()}")`,
    ).join(',');

    await conn.query(`INSERT INTO \`group\`(\`id\`, article_id, category_id, location, max_capacity, status, thumbnail,
                                            chat_url)
                      VALUES ${groupValues}`);
    console.log(`모집 게시글 더미 데이터 생성 완료: ${GROUP_ARTICLE_COUNT}`);

    console.log('신청정보 더미 데이터 생성 시작');
    const groupApplicationValues = Array.from(
      { length: GROUP_APPLICATION_COUNT },
      (v, k) =>
        `(${k + 1}, ${randomValue(1, USER_COUNT)}, ${randomValue(
          1,
          GROUP_ARTICLE_COUNT,
        )}, ${
          (k + 1) % (100 / DELETED_GROUP_APPLICATION_PERCENT) === 0
            ? null
            : '"REGISTER"'
        },${
          (k + 1) % (100 / DELETED_GROUP_APPLICATION_PERCENT) === 0
            ? 'now()'
            : null
        })`,
    ).join(',');

    await conn.query(`INSERT
    IGNORE INTO group_application(\`id\`, user_id, group_id, status, deleted_at)
                      VALUES
    ${groupApplicationValues}`);
    console.log(`신청정보 더미 데이터 생성 완료: ${GROUP_APPLICATION_COUNT}`);

    console.log('댓글 더미 데이터 생성 시작');
    const commentValues = Array.from(
      { length: COMMENT_COUNT },
      (v, k) =>
        `(${k + 1}, ${randomValue(1, USER_COUNT)}, ${randomValue(
          1,
          GROUP_ARTICLE_COUNT,
        )}, "${faker.lorem.paragraph(1)}", ${
          (k + 1) % (100 / DELETED_COMMENT_PERCENT) === 0 ? 'now()' : null
        })`,
    ).join(',');

    await conn.query(`INSERT
    IGNORE INTO comment(\`id\`, user_id, article_id, contents, deleted_at)
                      VALUES
    ${commentValues}`);
    console.log(`댓글 더미 데이터 생성 완료: ${COMMENT_COUNT}`);

    await conn.commit();
    result = true;
  } catch (e) {
    console.log(e);
    await conn.rollback();
  } finally {
    conn.destroy();
  }

  return result;
}

bulkInsert()
  .then((val) => console.log(val))
  .catch((res) => console.log(res));
