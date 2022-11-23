import { ArticlePreviewType, ArticleType } from '@typings/types';
import { Location } from '@constants/location';
import { ArticleStatus } from '@constants/article';
import { Category } from '@constants/category';

// TODO 개발용 dummy data, 추후 삭제
const dummyArticlePreview: ArticlePreviewType = {
  id: 1,
  title: '모집 테스트1',
  location: {
    id: 2,
    name: Location.BUSAN,
  },
  category: {
    id: 1,
    name: Category.STUDY,
  },
  commentCount: 31,
  scrapCount: 12,
  thumbnail: 'https://avatars.githubusercontent.com/u/90585081?v=4',
  maxCapacity: 5,
  currentCapacity: 3,
  status: ArticleStatus.PROGRESS,
  createdAt: '2021-04-03T18:45:19Z',
};

const dummyArticle: ArticleType = {
  id: 1,
  title: '모집 테스트1',
  location: {
    id: 2,
    name: Location.BUSAN,
  },
  category: {
    id: 1,
    name: Category.STUDY,
  },
  contents: '<div>test</div>',
  authorId: 1,
  authorName: 'JHPark_GOD',
  authorThumbnail: 'https://avatars.githubusercontent.com/u/90585081?v=4',
  commentCount: 31,
  scrapCount: 12,
  thumbnail: 'https://avatars.githubusercontent.com/u/90585081?v=4',
  maxCapacity: 5,
  currentCapacity: 3,
  status: ArticleStatus.PROGRESS,
  createdAt: '2021-04-03T18:45:19Z',
};

export { dummyArticlePreview, dummyArticle };
