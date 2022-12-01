import { ForbiddenException } from '@nestjs/common';

export class NotParticipantException extends ForbiddenException {
  constructor(message = '모집 게시글의 참가자가 아닙니다') {
    super({ status: 'NOT_PARTICIPANT', message });
  }
}
