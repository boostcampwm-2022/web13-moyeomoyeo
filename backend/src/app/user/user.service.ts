import { Injectable } from '@nestjs/common';
import { UserRepository } from '@app/user/user.repository';
import { UserNotFoundException } from '@app/user/exception/user-not-found.exception';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  checkUsernameUnique(userName: string) {
    return this.userRepository.findByUsername(userName) ? false : true;
  }

  async findUserById(id: number) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }
}
