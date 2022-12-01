import { rest } from 'msw';

import { getGroupArticles } from '@mocks/resolvers/getGroupArticles';
import { postTest } from '@mocks/resolvers/postTest';

import { getMyInfo } from './resolvers/getMyInfo';
import { getTest } from './resolvers/test';

export const handlers = [
  rest.get('https://testServer/test', getTest),
  rest.get('https://testServer/group-articles', getGroupArticles),
  rest.get('https://testServer/group-articles/me', getGroupArticles),
  rest.get('https://testServer/my-info', getMyInfo),
  rest.post('https://testServer/post-test', postTest),
];
