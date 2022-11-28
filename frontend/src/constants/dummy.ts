import { ArticleStatus } from '@constants/article';
import { Category } from '@constants/category';
import { Location } from '@constants/location';
import { ArticlePreviewType, ArticleType, UserType } from '@typings/types';

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

const dummyParticipants: Array<Partial<UserType>> = [
  {
    id: 1,
    userName: 'test1',
    description: '테스트 유저1입니다',
    profileImage: 'https://avatars.githubusercontent.com/u/90585081?v=4',
  },
  {
    id: 2,
    userName: 'test2',
    description: '테스트 유저2입니다',
    profileImage: 'https://avatars.githubusercontent.com/u/90585081?v=4',
  },
  {
    id: 3,
    userName: 'test3',
    description: '테스트 유저3입니다',
    profileImage: 'https://avatars.githubusercontent.com/u/90585081?v=4',
  },
  {
    id: 2,
    userName: 'test2',
    description: '테스트 유저2입니다',
    profileImage: 'https://avatars.githubusercontent.com/u/90585081?v=4',
  },
  {
    id: 4,
    userName: 'test4',
    description: '테스트 유저4입니다',
    profileImage: 'https://avatars.githubusercontent.com/u/90585081?v=4',
  },
  {
    id: 5,
    userName: 'test5',
    description: '테스트 유저5입니다',
    profileImage: 'https://avatars.githubusercontent.com/u/90585081?v=4',
  },
  {
    id: 6,
    userName: 'test6',
    description: '테스트 유저6입니다',
    profileImage: 'https://avatars.githubusercontent.com/u/90585081?v=4',
  },
  {
    id: 7,
    userName: 'test7',
    description: '테스트 유저7입니다',
    profileImage: 'https://avatars.githubusercontent.com/u/90585081?v=4',
  },
  {
    id: 8,
    userName: 'test8',
    description: '테스트 유저8입니다',
    profileImage: 'https://avatars.githubusercontent.com/u/90585081?v=4',
  },
];

const dummyUser = {
  id: 1,
  userName: 'test1',
  profileImage: 'https://avatars.githubusercontent.com/u/90585081?v=4',
  description: '나는 MC 입니다.',
  githubUrl: 'https://github.com/pythonstrup',
  blogUrl: 'https://myvelop.tistory.com/',
};

export { dummyArticlePreview, dummyArticle, dummyParticipants, dummyUser };
