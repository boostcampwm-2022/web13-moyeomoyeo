import { dummyUser } from '@constants/dummy';

export const getMyInfo = (req: any, res: any, ctx: any) => {
  return res(ctx.status(200), ctx.json({ ...dummyUser }));
};
