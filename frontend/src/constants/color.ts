import { ArticleStatus } from '@constants/article';
import { Category } from '@constants/category';
import { Location } from '@constants/location';

const LOCATION_COLOR = {
  [Location.SEJONG]: 'cyan',
  [Location.GWANGJU]: 'green',
  [Location.INCHEON]: 'yellow',
  [Location.GYEONGGI]: 'grape',
  [Location.CHUNGBUK]: 'violet',
  [Location.CHUNGNAM]: 'teal',
  [Location.BUSAN]: 'pink',
  [Location.DAEGU]: 'cyan',
  [Location.DAEJEON]: 'green',
  [Location.SEOUL]: 'yellow',
  [Location.GANGWON]: 'orange',
  [Location.JEONBUK]: 'grape',
  [Location.JEONNAM]: 'violet',
  [Location.ULSAN]: 'teal',
  [Location.JEJU]: 'pink',
  [Location.ONLINE]: 'cyan',
  [Location.GYEONGBUK]: 'green',
  [Location.GYEONGNAM]: 'yellow',
};

const CATEGORY_COLOR = {
  [Category.STUDY]: 'cyan',
  [Category.COMPETITION]: 'green',
  [Category.PROJECT]: 'yellow',
  [Category.MEAL]: 'grape',
  [Category.ETC]: 'violet',
};

const STATUS_COLOR = {
  [ArticleStatus.PROGRESS]: 'lime',
  [ArticleStatus.SUCCEED]: 'indigo',
  [ArticleStatus.FAIL]: 'red',
};

export { STATUS_COLOR, LOCATION_COLOR, CATEGORY_COLOR };
