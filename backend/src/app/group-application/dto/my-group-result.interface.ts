import {
  CATEGORY,
  GROUP_STATUS,
  LOCATION,
} from '@src/app/group-article/constants/group-article.constants';

export interface IMyGroupResult {
  groupArticleId: number;

  title: string;

  location: LOCATION;

  category: CATEGORY;

  commentCount: number;

  scrapCount: number;

  thumbnail: string;

  maxCapacity: number;

  currentCapacity: string;

  status: GROUP_STATUS;

  createdAt: Date;
}
