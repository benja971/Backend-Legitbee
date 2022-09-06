import { ReservationsService } from './../reservations/reservations.service';
import { Inject, Injectable, forwardRef, HttpException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.type';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: Repository<User>,
    @Inject(forwardRef(() => ReservationsService))
    private reservationService: ReservationsService,
  ) {}

  /**
   * User can be created, updated that includes the basics data (firstName, lastName, email, password) and the isActive flag (default: true) that can * be set to false to deactivate the user. A deactivated user can not login.
   */

  async create(user: CreateUserInput) {
    try {
      return await this.usersRepository.save(user);
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  async findOne(id: number) {
    try {
      return await this.usersRepository.findOneBy({ id });
    } catch (error) {
      throw new HttpException('Cannot find this user', 400);
    }
  }

  async remove(id: number) {
    // remove all related reservations
    await this.reservationService.removeByUserId(id);
    try {
      return await this.usersRepository.delete(id);
    } catch (error) {
      throw new HttpException('Cannot delete this user', 400);
    }
  }

  async update(id: number, user: UpdateUserInput) {
    const { name, isActive } = user;

    let userToUpdate;
    try {
      userToUpdate = await this.usersRepository.findOneBy({ id });
    } catch (error) {
      throw new HttpException('Cannot find this user', 400);
    }

    if (!userToUpdate) throw new HttpException('User not found', 404);

    const active = isActive?.toString() === 'false' ? false : true;

    const newUser = new UpdateUserInput(
      id,
      name !== undefined ? name : userToUpdate.name,
      isActive !== undefined ? active : userToUpdate.isActive,
    );

    if (!active) await this.reservationService.disableByUserId(id);

    try {
      return await this.usersRepository.update(id, newUser);
    } catch (error) {
      throw new HttpException('Cannot update this user', 400);
    }
  }

  async findAll() {
    try {
      return await this.usersRepository.find();
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }
}
