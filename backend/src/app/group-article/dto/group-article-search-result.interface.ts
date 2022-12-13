import {
  GROUP_STATUS,
  LOCATION,
} from '@app/group-article/constants/group-article.constants';

export interface IGroupArticleSearchResult {
  id: number;

  title: string;

  thumbnail: string;

  blurThumbnail: string;

  status: GROUP_STATUS;

  location: LOCATION;

  groupCategoryId: number;

  groupCategoryName: string;

  maxCapacity: number;

  currentCapacity: number;

  scrapCount: number;

  commentCount: number;

  createdAt: Date;
}
