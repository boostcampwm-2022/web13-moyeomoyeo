import axios from 'axios';

import { ArticleStatus } from '@constants/article';
import { Category } from '@constants/category';
import { Location } from '@constants/location';

const getGroupArticles = async (
  currentPage: number,
  category: Category,
  location: Location,
  filterProgress: boolean
) => {
  const status = filterProgress ? ArticleStatus.PROGRESS : null;
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/group-articles/search`, {
    params: { category, location, status, currentPage, countPerPage: 5 },
    withCredentials: true,
  });
};

export default getGroupArticles;
