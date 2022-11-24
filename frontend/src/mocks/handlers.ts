import { rest } from 'msw';
import { getTest } from './resolvers/test';
import { getGroupArticles } from '@mocks/resolvers/getGroupArticles';

export const handlers = [
  rest.get('http://testServer/test', getTest),
  rest.get('http://testServer/group-articles', getGroupArticles),
];
