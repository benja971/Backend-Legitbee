import { Inject, Injectable } from '@nestjs/common';
import { Car } from 'src/cars/entities/car.entity';
import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';

@Injectable()
export class ReservationsService {
  constructor(
    @Inject('CARS_REPOSITORY') private carRepository: Repository<Car>,
    @Inject('RESERVATIONS_REPOSITORY')
    private reservationRepository: Repository<Reservation>,
  ) {}

  /**
   * A reservation can be created, deleted, updated and updated. The update includes
   * the ability to modify the data and to cancel the reservation.
   * On a reservation, the car is reserved
   * On a cancellation, the car is released and the reservation is updated to be not alive
   * Need to get all reservations for a user
   */

  delete(id: number) {
    return this.reservationRepository.delete(id);
  }

  findAll(userId: number) {
    return this.reservationRepository.findBy({ userId });
  }
}
