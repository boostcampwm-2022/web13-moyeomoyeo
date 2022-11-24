import { Location } from '@constants/location';
import { ArticleStatus } from '@constants/article';
import { Category } from '@constants/category';

interface ArticlePreviewType {
  id: number;
  title: string;
  location: LocationType;
  category: CategoryType;
  commentCount: number;
  scrapCount: number;
  thumbnail: string;
  maxCapacity: number;
  currentCapacity: number;
  status: ArticleStatus;
  createdAt: string;
}

interface ArticleType {
  id: number;
  title: string;
  contents: string;
  authorId: number;
  authorName: string;
  authorThumbnail: string;
  location: LocationType;
  category: CategoryType;
  commentCount: number;
  scrapCount: number;
  thumbnail: string;
  maxCapacity: number;
  currentCapacity: number;
  status: ArticleStatus;
  createdAt: string;
}

interface LocationType {
  id: number;
  name: Location;
}

interface CategoryType {
  id: number;
  name: Category;
}

interface TestResponseType {
  dataArr: string[];
  isLast: boolean;
  currentId: number;
}

export type { ArticlePreviewType, ArticleType, LocationType, CategoryType, TestResponseType };
