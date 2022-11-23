import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js';

import ko from 'timeago.js/lib/lang/ko';

timeago.register('ko', ko);

interface Props {
  datetime: string;
}

const TimeFormatter = ({ datetime }: Props) => {
  return <TimeAgo datetime={datetime} locale="ko" />;
};

export default TimeFormatter;
