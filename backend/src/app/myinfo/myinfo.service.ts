import { Injectable } from '@nestjs/common';
import { UserRepository } from '@app/user/user.repository';
import { User } from '@app/user/entity/user.entity';
import { UserIdNotFoundException } from './exception/id-not-found.exception';
import { UsernameNotFoundException } from './exception/username-not-found.exception';

@Injectable()
export class MyInfoService {
  constructor(private readonly userRepository: UserRepository) {}

  async checkUserInfo(user: User) {
    const userItem = await this.userRepository.findById(user.id);
    if (!userItem) {
      throw new UserIdNotFoundException();
    }

    if (userItem.username !== user.username) {
      throw new UsernameNotFoundException();
    }
  }
}
