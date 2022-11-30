import { rest } from 'msw';

import { getGroupArticles } from '@mocks/resolvers/getGroupArticles';
import { postTest } from '@mocks/resolvers/postTest';

import { getMyInfo } from './resolvers/getMyInfo';
import { getTest } from './resolvers/test';

export const handlers = [
  rest.get('http://testServer/test', getTest),
  rest.get('http://testServer/group-articles', getGroupArticles),
  rest.get('http://testServer/group-articles/me', getGroupArticles),
  rest.get('http://testServer/my-info', getMyInfo),
  rest.post('http://testServer/post-test', postTest),
];
