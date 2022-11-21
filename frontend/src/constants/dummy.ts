import { Types } from '@typings/types';
import { Location } from '@constants/location';
import { ArticleStatus } from '@constants/article';

// TODO 개발용 dummy data, 추후 삭제
const dummyArticle: Types = {
  id: 1,
  title: '모집 테스트1',
  location: {
    id: 2,
    name: Location.BUSAN,
  },
  category: {
    id: 1,
    name: '스터디',
  },
  commentCount: 31,
  scrapCount: 12,
  thumbnail: 'https://avatars.githubusercontent.com/u/90585081?v=4',
  maxCapacity: 5,
  currentCapacity: 3,
  status: ArticleStatus.SUCCEED,
  createdAt: '2021-04-03',
};

export { dummyArticle };
