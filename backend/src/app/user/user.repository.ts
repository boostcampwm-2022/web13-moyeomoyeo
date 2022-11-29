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
    return this.findOneBy({ socialId, socialType });
  }

  findByUsername(userName: string) {
    return this.findOneBy({ userName });
  }

  findById(id: number) {
    return this.findOneBy({ id });
  }

  updateUser({
    id,
    userName,
    profileImage,
    description,
    githubUrl,
    blogUrl,
  }: {
    id: number;
    userName: string;
    profileImage: string;
    description: string;
    githubUrl: string;
    blogUrl: string;
  }) {
    return this.update(
      { id },
      {
        userName,
        profileImage,
        description,
        githubUrl,
        blogUrl,
      },
    );
  }
}
