import { Injectable } from '@nestjs/common';
import { UserRepository } from '@app/user/user.repository';
import { UserNotFoundException } from '@app/user/exception/user-not-found.exception';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async checkUsernameUnique(userName: string) {
    const user = await this.userRepository.findByUsername(userName);
    return user ? true : false;
  }

  async findUserById(id: number) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }
}
