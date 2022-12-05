import { ArticleStatus } from '@constants/article';
import { Category } from '@constants/category';
import { Location } from '@constants/location';
import { clientAxios } from '@utils/commonAxios';

const getGroupArticles = async (
  currentPage: number,
  category: Category,
  location: Location,
  filterProgress: boolean
) => {
  const status = filterProgress ? ArticleStatus.PROGRESS : null;
  return clientAxios('/v1/group-articles/search', {
    params: { category, location, status, currentPage, countPerPage: 5 },
    withCredentials: true,
  });
};

export default getGroupArticles;
