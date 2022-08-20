import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.type';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: Repository<User>,
  ) {}

  /**
   * User can be created, updated that includes the basics data (firstName, lastName, email, password) and the isActive flag (default: true) that can * be set to false to deactivate the user. A deactivated user can not login.
   */

  create(user: CreateUserInput) {
    return this.usersRepository.save(user);
  }

  findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }

  update(id: number, user: CreateUserInput) {
    return this.usersRepository.update(id, user);
  }

  findAll() {
    return this.usersRepository.find();
  }
}
