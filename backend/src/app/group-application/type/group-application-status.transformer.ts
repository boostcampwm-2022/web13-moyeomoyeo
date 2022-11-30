import { GROUP_APPLICATION_STATUS } from '@src/app/group-article/constants/group-article.constants';
import { ValueTransformer } from 'typeorm';

export class GroupApplicationStatusTransformer implements ValueTransformer {
  to(value: string) {
    return value === GROUP_APPLICATION_STATUS.CANCEL
      ? null
      : GROUP_APPLICATION_STATUS.REGISTER;
  }

  from(value: string | null) {
    return value
      ? GROUP_APPLICATION_STATUS.REGISTER
      : GROUP_APPLICATION_STATUS.CANCEL;
  }
}
