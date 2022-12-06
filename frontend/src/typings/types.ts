import { AxiosResponse } from 'axios';

import { ArticleStatus } from '@constants/article';
import { Category } from '@constants/category';
import { Location } from '@constants/location';

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
  contents: string;
  author: Pick<UserType, 'id' | 'userName' | 'profileImage'>;
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

interface MyArticleType {
  id: number;
  title: string;
  contents: string;
  location: Location;
  category: Category;
  thumbnail: string;
  maxCapacity: number;
  status: ArticleStatus;
  createdAt: string;
  chatUrl: string;
}

interface ArticlePostInputType {
  title: string;
  contents: string;
  thumbnail: string;
  chatUrl: string;
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

type ApiResponse<T> = AxiosResponse<{ data: T; message: string; status: string }>;

export type {
  ApiResponse,
  ArticlePreviewType,
  ArticleType,
  MyArticleType,
  ArticlePostInputType,
  TestResponseType,
  CommentType,
  UserType,
  ImageUploadType,
};
