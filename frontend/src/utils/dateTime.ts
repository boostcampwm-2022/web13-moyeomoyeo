import * as timeago from 'timeago.js';

import ko from 'timeago.js/lib/lang/ko';

timeago.register('ko', ko);

export default function dateTimeFormat(date: string | Date) {
  return timeago.format(date, 'ko');
}
