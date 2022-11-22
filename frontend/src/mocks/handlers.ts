import { rest } from 'msw';
import { getTest } from './test';

export const handlers = [rest.get('/test', getTest)];
