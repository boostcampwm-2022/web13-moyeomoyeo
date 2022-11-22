import { rest } from 'msw';
import { getTest } from './resolvers/test';

export const handlers = [rest.get('/test', getTest)];
