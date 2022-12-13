export const getTest = (req: any, res: any, ctx: any) => {
  const { searchParams } = req.url;
  const limit = Number(searchParams.get('limit'));
  const nextId = Number(searchParams.get('nextId'));

  const totalCount = testData.length;
  const totalPages = Math.round(totalCount / limit);

  return res(
    ctx.status(200),
    ctx.json({
      dataArr: testData.slice(limit * nextId, limit * nextId + limit),
      isLast: totalPages - 1 === nextId,
      currentId: nextId,
    })
  );
};

const testData = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'];
