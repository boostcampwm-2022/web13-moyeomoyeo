import { Injectable } from '@nestjs/common';
import { UserRepository } from '@app/user/user.repository';
import { ProfileModifyingRequest } from '@app/myinfo/dto/profile-modifying-request.dto';
import { UserNameDuplicateException } from '@app/myinfo/exception/username-duplicate.exception';

@Injectable()
export class MyInfoService {
  constructor(private readonly userRepository: UserRepository) {}

  async modifyProfile(
    userId: number,
    userName: string,
    ModifyingContents: ProfileModifyingRequest,
  ) {
    const user = await this.userRepository.findByUsername(
      ModifyingContents.userName,
    );
    if (user && userName !== ModifyingContents.userName) {
      throw new UserNameDuplicateException();
    }

    this.userRepository.updateUser({
      id: userId,
      userName: ModifyingContents.userName,
      profileImage: ModifyingContents.profileImage,
      description: ModifyingContents.description,
      githubUrl: ModifyingContents.githubUrl,
      blogUrl: ModifyingContents.blogUrl,
    });
  }
}
