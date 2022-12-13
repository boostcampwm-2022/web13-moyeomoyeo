import { DataSource, IsNull, Repository } from 'typeorm';
import { User } from '@app/user/entity/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    const baseRepository = dataSource.getRepository(User);
    super(
      baseRepository.target,
      baseRepository.manager,
      baseRepository.queryRunner,
    );
  }

  findBySocial(socialId: string, socialType: string) {
    return this.findOneBy({ socialId, socialType, deletedAt: IsNull() });
  }

  findByUsername(userName: string) {
    return this.findOneBy({ userName });
  }

  findById(id: number) {
    return this.findOneBy({ id, deletedAt: IsNull() });
  }

  updateUser(user: User) {
    return this.update(
      { id: user.id },
      {
        userName: user.userName,
        profileImage: user.profileImage,
        description: user.description,
        githubUrl: user.githubUrl,
        blogUrl: user.blogUrl,
      },
    );
  }
}
