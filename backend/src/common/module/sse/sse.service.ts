import { Injectable, MessageEvent } from '@nestjs/common';
import { EventEmitter } from 'events';
import { fromEvent } from 'rxjs';
import { User } from '@app/user/entity/user.entity';

@Injectable()
export class SseService {
  private readonly eventEmitter: EventEmitter;

  constructor() {
    this.eventEmitter = new EventEmitter();
  }

  subscribe(user: User) {
    return fromEvent(this.eventEmitter, `${user.id}`);
  }

  async emit(user: User, event: MessageEvent) {
    this.eventEmitter.emit(`${user.id}`, event);
  }
}
