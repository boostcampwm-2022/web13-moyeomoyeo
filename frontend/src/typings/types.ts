import { AxiosResponse } from 'axios';

import { ArticleStatus } from '@constants/article';
import { Category } from '@constants/category';
import { Location } from '@constants/location';
import { Notification } from '@constants/notification';

interface ArticlePreviewType {
  id: number;
  title: string;
  location: Location;
  category: Category;
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
  content: string;
  author: Partial<UserType>;
  location: Location;
  category: Category;
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

interface CommentType {
  id: number;
  authorId: number;
  authorName: string;
  authorProfileImage: string;
  contents: string;
  createdAt: string;
}

interface TestResponseType {
  dataArr: string[];
  isLast: boolean;
  currentId: number;
}

interface UserType {
  id: number;
  userName: string;
  profileImage: string;
  description: string;
  githubUrl: string;
  blogUrl: string;
}

interface ImageUploadType {
  key: string;
  url: string;
}

interface NotificationType {
  id: number;
  type: Notification;
  title: string;
  subTitle: string;
  createdAt: string;
}

type ApiResponse<T> = AxiosResponse<{ data: T; messasge: string; status: string }>;

export type {
  ApiResponse,
  ArticlePreviewType,
  ArticleType,
  LocationType,
  CategoryType,
  TestResponseType,
  CommentType,
  UserType,
  ImageUploadType,
  NotificationType,
};
