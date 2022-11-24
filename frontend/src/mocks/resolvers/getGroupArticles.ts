import { dummyArticlePreview } from '@constants/dummy';

export const getGroupArticles = (req: any, res: any, ctx: any) => {
  const { searchParams } = req.url;
  const limit = Number(searchParams.get('limit'));
  const nextId = Number(searchParams.get('nextId'));

  const totalCount = dummyArticlesPreview.length;
  const totalPages = Math.round(totalCount / limit);

  return res(
    ctx.status(200),
    ctx.json({
      articles: dummyArticlesPreview.slice(limit * nextId, limit * nextId + limit),
      isLast: totalPages - 1 === nextId,
      currentId: nextId,
    })
  );
};

const dummyArticlesPreview = Array.from({ length: 20 })
  .fill(0)
  .map((_, index) => ({ ...dummyArticlePreview, id: index }));
