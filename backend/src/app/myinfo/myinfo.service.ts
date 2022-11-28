import { Injectable } from '@nestjs/common';
import { UserRepository } from '@app/user/user.repository';

@Injectable()
export class MyInfoService {
  constructor(private readonly userRepository: UserRepository) {}
}
