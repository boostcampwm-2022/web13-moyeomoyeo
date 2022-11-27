import { Injectable } from '@nestjs/common';
import { UserRepository } from '@app/user/user.repository';
import { User } from '@app/user/entity/user.entity';

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
    if (!user) {
      const newUser = User.signup({
        socialId: id,
        githubUrl,
        profileImage,
        blogUrl,
        socialType,
      });
      await this.userRepository.save(newUser);
      return newUser;
    }
    return user;
  }
}
