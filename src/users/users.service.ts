import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { LoginUserInput } from './dto/login-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  /**
   * User can be created, updated that includes the basics data (firstName, lastName, email, password) and the isActive flag (default: true) that can be set to false to deactivate the user. A deactivated user can not login.
   */

  create(createUserInput: CreateUserInput) {
    const { email } = createUserInput;

    // Check if user already exists
    // emails are unique, so we can use it to check if user already exists

    const user = this.usersRepository.findOneBy({ email });

    if (user) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    // could crypt the password here

    return this.usersRepository.save(createUserInput);
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return this.usersRepository.update(id, updateUserInput);
  }

  delete(id: number) {
    return this.usersRepository.delete(id);
  }

  async login(loginUserInput: LoginUserInput) {
    const { email, password } = loginUserInput;
    // Check if user exists
    const user = this.usersRepository.findOneBy({ email });

    if (!user) {
      throw new HttpException(
        'User with this email does not exist',
        HttpStatus.NOT_FOUND,
      );
    }

    // Check if password is correct
    if ((await user).password !== password) {
      throw new HttpException('Password is incorrect', HttpStatus.BAD_REQUEST);
    }

    // Check if user is active
    if (!(await user).isActive) {
      throw new HttpException('User is not active', HttpStatus.BAD_REQUEST);
    }

    return user;
  }
}
