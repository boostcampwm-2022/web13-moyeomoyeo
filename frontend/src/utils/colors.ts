import { BADGE_COLORS, STATUS_COLOR } from '@constants/color';
import { ArticleStatus } from '@constants/article';

const getCommonBadgeColor = (id: number) => {
  const colorCount = BADGE_COLORS.length;
  return BADGE_COLORS[id % colorCount];
};

const getStatusBadgeColor = (status: ArticleStatus) => {
  return STATUS_COLOR[status];
};

export { getCommonBadgeColor, getStatusBadgeColor };
