import { AxiosResponse } from 'axios';

import { ArticleStatus } from '@constants/article';
import { Category } from '@constants/category';
import { Location } from '@constants/location';
import { Notification } from '@constants/notification';

interface PagingDataType<T> {
  totalPage: number;
  currentPage: number;
  countPerPage: number;
  data: T;
}

interface ApiResponseType<T> {
  status: string;
  message: string;
  data: T;
}

interface ArticleThumbnailType {
  originUrl: string;
  blurUrl: string;
}

interface ArticlePreviewType {
  id: number;
  title: string;
  location: Location;
  category: Category;
  commentCount: number;
  scrapCount: number;
  thumbnail: ArticleThumbnailType;
  maxCapacity: number;
  currentCapacity: number;
  status: ArticleStatus;
  createdAt: string;
}

interface ArticleType extends ArticlePreviewType {
  contents: string;
  author: Partial<UserType>;
}

interface MyArticleType
  extends Omit<
    ArticleType,
    'commentCount' | 'scrapCount' | 'currentCapacity' | 'author' | 'thumbnail'
  > {
  chatUrl: string;
  thumbnail: string;
}

interface ArticlePostInputType extends Pick<MyArticleType, 'title' | 'contents' | 'chatUrl'> {
  thumbnail: string;
}

interface CommentType {
  id: number;
  authorId: number;
  authorName: string;
  authorProfileImage: string;
  contents: string;
  createdAt: string;
}

interface CommentInputType extends Pick<CommentType, 'contents'> {
  articleId: number;
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

type ApiResponse<T> = AxiosResponse<{ data: T; message: string; status: string }>;

interface NotificationType {
  id: number;
  type: Notification;
  title: string;
  subTitle: string;
  createdAt: string;
}

export type {
  ApiResponse,
  ApiResponseType,
  ArticlePreviewType,
  ArticleType,
  MyArticleType,
  ArticlePostInputType,
  PagingDataType,
  TestResponseType,
  CommentType,
  CommentInputType,
  UserType,
  ImageUploadType,
  NotificationType,
};
