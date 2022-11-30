import { dummyUser } from '@constants/dummy';

export const postTest = (req: any, res: any, ctx: any) => {
  return res(ctx.status(401), ctx.json({ ...dummyUser }));
};
