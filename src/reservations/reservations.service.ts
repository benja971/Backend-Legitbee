import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Car } from 'src/cars/entities/car.type';
import { Between, Repository } from 'typeorm';
import { CreateReservationInput } from './dto/create-reservation.input';
import { Reservation } from './entities/reservation.type';

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

  async get(id: number) {
    return await this.reservationRepository.findOneBy({ id });
  }

  async createReservation(reservation: CreateReservationInput) {
    const { id_car, start_date, end_date } = reservation;

    // check if date range is valid
    if (start_date > end_date) {
      throw new HttpException("Date range isn't correct", 400);
    }

    /**
     * Vérifier que la voiture est disponible
       => pour chaque reservations encore actives de la voiture en question,
          vérifier que les dates de la nouvelle réservation ne chevauchent pas
          de réservations actuelle
     * 
     * SELECT COUNT(*)
      FROM Reservations 
      WHERE isActive = TRUE AND idCar = {idCar} AND (({debut} >= start_date AND {debut} <= end_date})
      OR ({fin} >= start_date AND {fin} <= end_date}))
     */
    const isNotAvailable = new Boolean(
      await this.reservationRepository.count({
        where: [
          {
            isActive: true,
            car_id: id_car,
            start_date: Between(start_date, end_date),
          },
          {
            isActive: true,
            car_id: id_car,
            end_date: Between(start_date, end_date),
          },
        ],
      }),
    );

    if (isNotAvailable) {
      throw new HttpException('Car is not available', 409);
    }

    return this.reservationRepository.save(reservation);
  }

  async update(id: number, reservation: CreateReservationInput) {
    return await this.reservationRepository.update(id, reservation);
  }

  async delete(id: number) {
    return await this.reservationRepository.delete(id);
  }
}
