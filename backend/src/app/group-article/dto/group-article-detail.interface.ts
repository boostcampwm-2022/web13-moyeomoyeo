import {
  GROUP_STATUS,
  LOCATION,
} from '@app/group-article/constants/group-article.constants';

export interface IGroupArticleDetail {
  id: number;
  title: string;
  contents: string;
  userId: number;
  userName: string;
  userProfileImage: string;
  maxCapacity: number;
  thumbnail: string;
  status: GROUP_STATUS;
  location: LOCATION;
  groupCategoryId: number;
  groupCategoryName: string;
  scrapCount: number;
  commentCount: number;
  createdAt: Date;
}
