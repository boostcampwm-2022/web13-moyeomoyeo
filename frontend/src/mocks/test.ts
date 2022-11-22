export const getTest = (req: any, res: any, ctx: any) => {
  return res(
    ctx.json({
      message: 'hi',
    })
  );
};
