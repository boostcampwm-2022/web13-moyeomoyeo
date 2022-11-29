import { Injectable } from '@nestjs/common';
import { UserRepository } from '@app/user/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  checkUsernameUnique(username: string) {
    return this.userRepository.findByUsername(username) ? false : true;
  }
}
