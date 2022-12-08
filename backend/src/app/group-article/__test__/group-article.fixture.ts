import { faker } from '@faker-js/faker';
import { Group } from '@app/group-article/entity/group.entity';
import { GroupArticle } from '@app/group-article/entity/group-article.entity';

export const getGroupArticleFixture = async (
  group: Group,
  groupArticle: Partial<GroupArticle> = {},
) => {
  const fixture = new GroupArticle();
  fixture.id = groupArticle.id || faker.datatype.number();
  fixture.group = group;
  group.article = new Promise((res, rej) => {
    res(fixture);
  });
  fixture.userId = (await groupArticle.user).id;
  fixture.user = groupArticle.user;
  fixture.title = groupArticle.title || faker.commerce.product();
  fixture.contents =
    groupArticle.contents || faker.commerce.productDescription();
  fixture.type = 'GROUP';
  fixture.createdAt = new Date();
  fixture.updatedAt = new Date();
  return fixture;
};
