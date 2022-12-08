import { GroupCategory } from '@app/group-article/entity/group-category.entity';

export const getGroupCategoryFixture = () => {
  const categories = ['MEAL', 'STUDY', 'ETC', 'COMPETITION', 'PROJECT'];
  return categories.map((category) => {
    const fixture = new GroupCategory();
    fixture.name = category;
    fixture.createdAt = new Date();
    fixture.updatedAt = new Date();
    return fixture;
  });
};
