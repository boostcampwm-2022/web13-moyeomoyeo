import { Location } from '@constants/location';
import { ArticleStatus } from '@constants/article';

interface Types {
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

interface LocationType {
  id: number;
  name: Location;
}

interface CategoryType {
  id: number;
  name: string;
}

export type { Types, LocationType, CategoryType };
