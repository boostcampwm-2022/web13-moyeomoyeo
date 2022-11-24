import { Injectable } from '@nestjs/common';
import { UserRepository } from '@app/user/user.repository';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async socialLogin({
    id,
    githubUrl,
    profileImage,
    blogUrl,
    socialType,
  }: {
    id: string;
    githubUrl: string;
    profileImage: string;
    blogUrl: string;
    socialType: string;
  }) {
    const user = await this.userRepository.findBySocial(id, socialType);

    return user;
  }
}
