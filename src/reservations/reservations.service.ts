import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from 'src/cars/entities/car.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateReservationInput } from './dto/create-reservation.input';
import { UpdateReservationInput } from './dto/update-reservation.input';
import { Reservation } from './entities/reservation.entity';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
    @InjectRepository(Car)
    private carRepository: Repository<Car>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /**
   * A reservation can be created, deleted, updated and updated. The update includes
   * the ability to modify the data and to cancel the reservation.
   * On a reservation, the car is reserved
   * On a cancellation, the car is released and the reservation is updated to be not alive
   * Need to get all reservations for a user
   */

  async create(createReservationInput: CreateReservationInput) {
    const { carId } = createReservationInput;

    const car = this.carRepository.findOneBy({ id: carId });

    if (!car) {
      // Send a message to the user that the car does not exist
      throw new HttpException('No car found', 404);
    }

    if ((await car).isReserved) {
      // Send a message to the user that the car is already reserved
      throw new HttpException('Car is already reserved', 406);
    }

    // Update the car to be reserved
    await this.carRepository.update(carId, { isReserved: true });

    return this.reservationRepository.save(createReservationInput);
  }

  update(id: number, updateReservationInput: UpdateReservationInput) {
    const { isAlive } = updateReservationInput;

    if (!isAlive) {
      // Update the car to be not reserved
      this.carRepository.update(id, { isReserved: false });
    }

    return this.reservationRepository.update(id, updateReservationInput);
  }

  delete(id: number) {
    return this.reservationRepository.delete(id);
  }

  findAll(userId: number) {
    return this.reservationRepository.findBy({ userId });
  }
}
