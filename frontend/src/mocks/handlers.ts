import { rest } from 'msw';
import { getTest } from './resolvers/test';

export const handlers = [rest.get('http://localhost:3000/test', getTest)];
