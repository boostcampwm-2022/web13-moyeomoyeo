import { User } from '@app/user/entity/user.entity';

export const getUserFixture = (user: Partial<User>) => {
  const fixture = new User();
  fixture.id = user.id || 1;
  fixture.userName = user.userName || 'tester001';
  fixture.githubUrl = user.githubUrl || '';
  fixture.blogUrl = user.blogUrl || '';
  fixture.description = user.description || '';
  fixture.profileImage = user.profileImage || '';
  fixture.socialId = user.socialId || '123';
  fixture.socialType = user.socialType || 'GITHUB';
  fixture.createdAt = new Date();
  fixture.updatedAt = new Date();
  return fixture;
};
