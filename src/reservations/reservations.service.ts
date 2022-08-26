import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { Cars } from 'src/cars/entities/cars.entity';
import { Users } from 'src/users/entities/user.entity';
import { Between, Not, Repository } from 'typeorm';
import { CarsService } from './../cars/cars.service';
import { CreateReservationInput } from './dto/create-reservation.input';
import { UpdateReservationInput } from './dto/update-reservation.input';
import { Reservations } from './entities/reservation.entity';

@Injectable()
export class ReservationsService {
  constructor(
    @Inject(forwardRef(() => CarsService))
    private carService: CarsService,
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
    const { id_car, id_user, start_date, end_date } = reservation;

    const user = await this.userRepository.findOneBy({ id: id_user });

    const car = await this.carService.findOne(id_car);

    if (!car) {
      throw new HttpException('Car not found', 404);
    }

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // check if date range is valid
    if (
      today > new Date(start_date) ||
      today > new Date(end_date) ||
      new Date(start_date) > new Date(end_date)
    ) {
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

    if (count > 0) throw new HttpException('Cant succeed', 409);

    return this.reservationRepository.save(reservation);
  }

  async isValidReservation(reservation: UpdateReservationInput) {
    const { id, id_car, start_date, end_date } = reservation;

    const s_date = new Date(start_date);
    const e_date = new Date(end_date);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // check if date range is valid
    if (today > s_date || today > e_date || s_date > e_date) {
      throw new HttpException("Date range isn't correct", 400);
    }

    let count: number;

    try {
      // check if car is available
      count = await this.reservationRepository.count({
        where: [
          {
            id: Not(id),
            isActive: true,
            id_car,
            start_date: Between(start_date, end_date),
          },
          {
            id: Not(id),
            isActive: true,
            id_car,
            end_date: Between(start_date, end_date),
          },
        ],
      });
    } catch (error) {
      throw new HttpException(error, 400);
    }

    return count === 0;
  }

  async updateReservation(id: number, reservation: UpdateReservationInput) {
    const { id_car, id_user, start_date, end_date, isActive } = reservation;

    let user: Users, car: Cars, reservationToUpdate: Reservations;

    try {
      reservationToUpdate = await this.reservationRepository.findOneBy({ id });
    } catch (error) {
      throw new HttpException('Reservation not found', 404);
    }

    try {
      user = await this.userRepository.findOneBy({ id: id_user });
    } catch (error) {
      throw new HttpException('User not found', 404);
    }

    try {
      car = await this.carService.findOne(id_car);
    } catch (error) {
      throw new HttpException('Car not found', 404);
    }

    if (!reservationToUpdate)
      throw new HttpException('Reservation not found', 404);
    if (!car) throw new HttpException('Car not found', 404);
    if (!user) throw new HttpException('User not found', 404);

    const active = isActive?.toString() === 'false' ? false : true;

    const resa = new UpdateReservationInput(
      id,
      id_car !== undefined ? id_car : reservationToUpdate.id_car,
      id_user !== undefined ? id_user : reservationToUpdate.id_user,
      start_date !== undefined ? start_date : reservationToUpdate.start_date,
      end_date !== undefined ? end_date : reservationToUpdate.end_date,
      isActive !== undefined ? active : reservationToUpdate.isActive,
    );

    if (await this.isValidReservation(resa))
      return this.reservationRepository.update(id, resa);

    throw new HttpException('Cant succeed', 409);
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

  async deleteReservationsByCarId(id: number) {
    return await this.reservationRepository.delete({ id_car: id });
  }

  async disableReservationsByCarId(id: number) {
    return await this.reservationRepository.update(
      { id_car: id },
      { isActive: false },
    );
  }

  async removeByUserId(id: number) {
    return await this.reservationRepository.delete({ id_user: id });
  }

  async disableByUserId(id: number) {
    return await this.reservationRepository.update(
      { id_user: id },
      { isActive: false },
    );
  }
}
