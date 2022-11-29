import { DataSource, Repository } from 'typeorm';
import { User } from '@app/user/entity/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(
      User,
      dataSource.createEntityManager(),
      dataSource.createQueryRunner(),
    );
  }

  findBySocial(socialId: string, socialType: string) {
    return this.findOneBy({ socialId, socialType, deletedAt: null });
  }

  findByUsername(userName: string) {
    return this.findOneBy({ userName, deletedAt: null });
  }

  findById(id: number) {
    return this.findOneBy({ id, deletedAt: null });
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
