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

  async create(user: CreateUserInput) {
    return await this.usersRepository.save(user);
  }

  async findOne(id: number) {
    return await this.usersRepository.findOneBy({ id });
  }

  async remove(id: number) {
    return await this.usersRepository.delete(id);
  }

  async update(id: number, user: CreateUserInput) {
    return await this.usersRepository.update(id, user);
  }

  async findAll() {
    return await this.usersRepository.find();
  }
}
