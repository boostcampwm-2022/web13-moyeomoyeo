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
    profileModifyingRequest: ProfileModifyingRequest,
  ) {
    const user = await this.userRepository.findByUsername(
      profileModifyingRequest.userName,
    );
    if (user && userName !== profileModifyingRequest.userName) {
      throw new UserNameDuplicateException();
    }

    this.userRepository.updateUser({
      id: userId,
      userName: profileModifyingRequest.userName,
      profileImage: profileModifyingRequest.profileImage,
      description: profileModifyingRequest.description,
      githubUrl: profileModifyingRequest.githubUrl,
      blogUrl: profileModifyingRequest.blogUrl,
    });
  }
}
