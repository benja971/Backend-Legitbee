import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Cars } from 'src/cars/entities/cars.entity';
import { Users } from 'src/users/entities/user.entity';
import { Between, Repository } from 'typeorm';
import { CreateReservationInput } from './dto/create-reservation.input';
import { UpdateReservationInput } from './dto/update-reservation.input';
import { Reservations } from './entities/reservation.entity';

@Injectable()
export class ReservationsService {
  constructor(
    @Inject('CARS_REPOSITORY') private carRepository: Repository<Cars>,
    @Inject('USERS_REPOSITORY') private userRepository: Repository<Users>,
    @Inject('RESERVATIONS_REPOSITORY')
    private reservationRepository: Repository<Reservations>,
  ) {}

  /**
   * A reservation can be created, deleted, updated and updated. The update includes
   * the ability to modify the data and to cancel the reservation.
   * On a reservation, the car is reserved
   * On a cancellation, the car is released and the reservation is updated to be not alive
   * Need to get all reservations for a user
   */

  async get(id: number) {
    return await this.reservationRepository.findOneBy({
      isActive: true,
      id,
    });
  }

  async getAll() {
    return await this.reservationRepository.findBy({
      isActive: true,
    });
  }

  async createReservation(reservation: CreateReservationInput) {
    let { id_car, id_user, start_date, end_date } = reservation;

    id_car = typeof id_car === 'string' ? parseInt(id_car) : id_car;
    id_user = typeof id_user === 'string' ? parseInt(id_user) : id_user;
    start_date = new Date(start_date);
    end_date = new Date(end_date);

    const user = await this.userRepository.findOneBy({ id: id_user });
    const car = await this.carRepository.findOneBy({ id: id_car });

    if (!car) {
      throw new HttpException('Car not found', 404);
    }

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // check if date range is valid
    if (today > start_date || today > end_date || start_date > end_date) {
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
      WHERE isActive = TRUE AND idCar = {idCar} AND (({debut} >= startDate AND {debut} <= endDate})
      OR ({fin} >= startDate AND {fin} <= endDate}))
     */

    const count = await this.reservationRepository.count({
      where: [
        {
          isActive: true,
          id_car,
          start_date: Between(start_date, end_date),
        },
        {
          isActive: true,
          id_car,
          end_date: Between(start_date, end_date),
        },
      ],
    });

    console.log(count);

    // : Between(start_date, end_date)

    if (count > 0) {
      throw new HttpException('Cant succeed', 409);
    }

    const resa = {
      id_car,
      id_user,
      start_date,
      end_date,
    };

    return this.reservationRepository.save(resa);
  }

  async updateReservation(id: number, reservation: UpdateReservationInput) {
    return await this.reservationRepository.update(id, reservation);
  }

  async deleteReservation(id: number) {
    return await this.reservationRepository.delete(id);
  }

  async getAllForUser(id: number) {
    return await this.reservationRepository.findBy({
      id_user: id,
      isActive: true,
    });
  }
}
