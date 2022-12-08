import { faker } from '@faker-js/faker';
import {
  GROUP_STATUS,
  LOCATION,
} from '@app/group-article/constants/group-article.constants';
import { GroupCategory } from '@app/group-article/entity/group-category.entity';
import { Group } from '@app/group-article/entity/group.entity';

export const getGroupFixture = (
  groupCategory: GroupCategory,
  group: Partial<Group> = {},
) => {
  const fixture = new Group();
  fixture.category = groupCategory;
  fixture.location = LOCATION.ONLINE;
  fixture.maxCapacity = group.maxCapacity || 10;
  fixture.status = group.status || GROUP_STATUS.PROGRESS;
  fixture.chatUrl = group.chatUrl || faker.internet.url();
  fixture.thumbnail = group.thumbnail || faker.internet.url();
  fixture.createdAt = new Date();
  fixture.updatedAt = new Date();
  return fixture;
};
