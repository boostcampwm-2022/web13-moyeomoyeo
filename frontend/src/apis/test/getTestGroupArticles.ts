import axios from 'axios';

import { Category } from '@constants/category';
import { Location } from '@constants/location';

const getTestGroupArticles = async (
  nextId: number,
  category: Category,
  location: Location,
  progress: boolean
) => {
  return axios.get(`http://testServer/group-articles`, {
    params: { category, location, progress, nextId, limit: 5 },
  });
};

export default getTestGroupArticles;
