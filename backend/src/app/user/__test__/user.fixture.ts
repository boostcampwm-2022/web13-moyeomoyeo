import { User } from '@app/user/entity/user.entity';
import { faker } from '@faker-js/faker';

export const getUserFixture = (user: Partial<User> = {}) => {
  const fixture = new User();
  fixture.id = user.id || faker.datatype.number({ min: 1, max: 10000 });
  fixture.userName = user.userName || faker.name.fullName();
  fixture.githubUrl = user.githubUrl || faker.internet.url();
  fixture.blogUrl = user.blogUrl || faker.internet.url();
  fixture.description = user.description || faker.commerce.productDescription();
  fixture.profileImage = user.profileImage || faker.internet.url();
  fixture.socialId = user.socialId || '123';
  fixture.socialType = user.socialType || 'GITHUB';
  fixture.createdAt = new Date();
  fixture.updatedAt = new Date();
  return fixture;
};
