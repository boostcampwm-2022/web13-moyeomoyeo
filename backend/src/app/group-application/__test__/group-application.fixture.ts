import { faker } from '@faker-js/faker';
import { Group } from '@app/group-article/entity/group.entity';
import { GroupApplication } from '@app/group-application/entity/group-application.entity';
import { GROUP_APPLICATION_STATUS } from '@src/app/group-article/constants/group-article.constants';

export const getGroupApplicationRegisterFixture = async (
  group: Group,
  groupApplication: Partial<GroupApplication> = {},
) => {
  const fixture = new GroupApplication();
  fixture.id = groupApplication.id || faker.datatype.number();
  fixture.userId = (await groupApplication.user).id;
  fixture.user = groupApplication.user;
  fixture.groupId = group.id;
  fixture.group = new Promise((res) => res(group));
  fixture.status = groupApplication.status || GROUP_APPLICATION_STATUS.REGISTER;
  fixture.createdAt = new Date();
  fixture.updatedAt = new Date();
  return fixture;
};
