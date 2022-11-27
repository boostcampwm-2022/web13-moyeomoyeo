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
}
