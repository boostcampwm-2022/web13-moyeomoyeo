import { Injectable } from '@nestjs/common';
import { UserRepository } from '@app/user/user.repository';
import { UserNotFoundException } from './exception/user-not-found.exception';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  checkUsernameUnique(username: string) {
    return this.userRepository.findByUsername(username) ? false : true;
  }

  async findUserById(id: number) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }
}
