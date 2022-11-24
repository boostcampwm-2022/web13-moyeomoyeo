import { ArticleStatus } from '@constants/article';

const BADGE_COLORS = ['cyan', 'green', 'yellow', 'orange', 'grape', 'violet', 'teal', 'pink'];

const STATUS_COLOR = {
  [ArticleStatus.PROGRESS]: 'lime',
  [ArticleStatus.SUCCEED]: 'indigo',
  [ArticleStatus.FAIL]: 'red',
};

export { BADGE_COLORS, STATUS_COLOR };
