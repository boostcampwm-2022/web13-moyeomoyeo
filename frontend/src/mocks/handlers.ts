import { rest } from 'msw';
import { getTest } from './resolvers/test';

export const handlers = [rest.get('http://localhost:4000/test', getTest)];
