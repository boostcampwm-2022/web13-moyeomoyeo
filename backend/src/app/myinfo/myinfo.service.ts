import { Injectable } from '@nestjs/common';
import { UserRepository } from '@app/user/user.repository';
import { ProfileModifyingRequest } from '@app/myinfo/dto/profile-modifying-request.dto';
import { UserNameDuplicateException } from '@app/myinfo/exception/username-duplicate.exception';
import { User } from '../user/entity/user.entity';

@Injectable()
export class MyInfoService {
  constructor(private readonly userRepository: UserRepository) {}

  async updateProfile(user: User, ModifyingContents: ProfileModifyingRequest) {
    const currentUser = await this.userRepository.findByUsername(
      ModifyingContents.userName,
    );
    if (currentUser && user.userName !== ModifyingContents.userName) {
      throw new UserNameDuplicateException();
    }

    user.updateProfile({
      userName: ModifyingContents.userName,
      profileImage: ModifyingContents.profileImage,
      description: ModifyingContents.description,
      githubUrl: ModifyingContents.githubUrl,
      blogUrl: ModifyingContents.blogUrl,
    });
    this.userRepository.updateUser(user);
  }
}
