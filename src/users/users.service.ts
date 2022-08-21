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
    return await this.usersRepository.save(user);
  }

  async findOne(id: number) {
    return await this.usersRepository.findOneBy({ id });
  }

  async remove(id: number) {
    // remove all related reservations
    await this.reservationService.removeByUserId(id);
    return await this.usersRepository.delete(id);
  }

  async update(id: number, user: UpdateUserInput) {
    const { name, isActive } = user;

    let ok = false;

    const car = await this.usersRepository.findOneBy({ id });
    if (!car) throw new HttpException('Car not found', 404);

    if (ok === false && name) ok = true;

    const active = isActive.toString() === 'false' ? false : true;
    if (ok === false && active === false) {
      user.isActive = active;

      // disable all the reservations related to the car
      await this.reservationService.disableReservationsByCarId(id);

      ok = true;
    }

    return await this.usersRepository.update(id, user);
  }

  async findAll() {
    return await this.usersRepository.find();
  }
}
