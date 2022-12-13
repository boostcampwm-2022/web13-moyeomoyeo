import { Injectable } from '@nestjs/common';
import { UserRepository } from '@app/user/user.repository';
import { User } from '@app/user/entity/user.entity';
import { DataSource } from 'typeorm';
import { NotificationSetting } from '@app/notification/entity/notification-setting.entity';
import { NOTIFICATION_SETTING_TYPE } from '@app/notification/constants/notification.constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly dataSource: DataSource,
  ) {}

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

      await this.dataSource.transaction(async (em) => {
        await em.save(newUser);
        await em.save([
          NotificationSetting.create(newUser, NOTIFICATION_SETTING_TYPE.GROUP),
          NotificationSetting.create(
            newUser,
            NOTIFICATION_SETTING_TYPE.COMMENT,
          ),
        ]);
      });

      return newUser;
    }
    return user;
  }
}
