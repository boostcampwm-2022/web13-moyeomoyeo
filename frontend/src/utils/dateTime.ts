import { format, register } from 'timeago.js';
import ko from 'timeago.js/lib/lang/ko';

register('ko', ko);

export default function dateTimeFormat(date: string | Date) {
  return format(date, 'ko');
}
