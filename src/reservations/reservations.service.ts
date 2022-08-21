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
    private carRepository: Repository<Cars>,
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

  async updateReservation(id: number, reservation: UpdateReservationInput) {
    const { id_car, start_date, end_date, isActive } = reservation;

    let ok = false;

    const resa = await this.reservationRepository.findOneBy({ id });
    const newCar = await this.carRepository.findOneBy({ id: id_car });

    if (!resa) throw new HttpException('Reservation not found', 404);

    // car, start_date, end_date
    if (ok === false && id_car && start_date && end_date) {
      if (!newCar) throw new HttpException('Car not found', 404);

      // check if date range is valid
      if (new Date(start_date) > new Date(end_date))
        throw new HttpException("Date range isn't correct", 400);

      // check if car is available
      const count = await this.reservationRepository.count({
        where: [
          {
            id: Not(resa.id),
            isActive: true,
            id_car,
            start_date: Between(start_date, end_date),
          },
          {
            id: Not(resa.id),
            isActive: true,
            id_car,
            end_date: Between(start_date, end_date),
          },
        ],
      });

      if (count > 0)
        throw new HttpException("Can't reserved that car at this moment", 409);

      ok = true;
    }

    // car, start_date
    if (ok === false && id_car && start_date) {
      if (!newCar) throw new HttpException('Car not found', 404);

      // check if car is available
      const count = await this.reservationRepository.count({
        where: [
          {
            id: Not(resa.id),
            isActive: true,
            id_car,
            start_date: Between(start_date, resa.end_date),
          },
          {
            id: Not(resa.id),
            isActive: true,
            id_car,
            end_date: Between(start_date, resa.end_date),
          },
        ],
      });

      if (count > 0)
        throw new HttpException("Can't reserved that car at this moment", 409);

      ok = true;
    }

    // car, end_date
    if (ok === false && id_car && end_date) {
      if (!newCar) throw new HttpException('Car not found', 404);

      // check if date range is valid
      if (new Date(resa.start_date) > end_date)
        throw new HttpException("Date range isn't correct", 400);

      // check if car is available
      const count = await this.reservationRepository.count({
        where: [
          {
            id: Not(resa.id),
            isActive: true,
            id_car,
            start_date: Between(resa.start_date, end_date),
          },
          {
            id: Not(resa.id),
            isActive: true,
            id_car,
            end_date: Between(resa.start_date, end_date),
          },
        ],
      });

      if (count > 0)
        throw new HttpException("Can't reserved that car at this moment", 409);

      ok = true;
    }

    // start_date, end_date
    if (ok === false && start_date && end_date) {
      // check if date range is valid
      if (start_date > end_date)
        throw new HttpException("Date range isn't correct", 400);

      // check if car is available
      const count = await this.reservationRepository.count({
        where: [
          {
            id: Not(resa.id),
            isActive: true,
            id_car: resa.id_car,
            start_date: Between(start_date, end_date),
          },
          {
            id: Not(resa.id),
            isActive: true,
            id_car: resa.id_car,
            end_date: Between(start_date, end_date),
          },
        ],
      });

      if (count > 0)
        throw new HttpException("Can't reserved that car at this moment", 409);

      ok = true;
    }

    // car
    if (ok === false && id_car) {
      if (!newCar) throw new HttpException('Car not found', 404);

      // check if car is available
      const count = await this.reservationRepository.count({
        where: [
          {
            id: Not(resa.id),
            isActive: true,
            id_car,
            start_date: Between(resa.start_date, resa.end_date),
          },
          {
            id: Not(resa.id),
            isActive: true,
            id_car,
            end_date: Between(resa.start_date, resa.end_date),
          },
        ],
      });

      if (count > 0)
        throw new HttpException("Can't reserved that car at this moment", 409);

      ok = true;
    }

    // start_date
    if (ok === false && start_date) {
      // check date range
      if (new Date(start_date) > new Date(resa.end_date))
        throw new HttpException("Date range isn't correct", 400);

      // check if car is available
      const count = await this.reservationRepository.count({
        where: [
          {
            id: Not(resa.id),
            isActive: true,
            id_car: resa.id_car,
            start_date: Between(start_date, resa.end_date),
          },
          {
            id: Not(resa.id),
            isActive: true,
            id_car: resa.id_car,
            end_date: Between(start_date, resa.end_date),
          },
        ],
      });

      if (count > 0)
        throw new HttpException("Can't reserved that car at this moment", 409);

      ok = true;
    }

    // end_date
    if (ok === false && end_date) {
      // check if date range is valid

      if (new Date(resa.start_date) > new Date(end_date))
        throw new HttpException("Date range isn't correct", 400);

      // check if car is available
      const count = await this.reservationRepository.count({
        where: [
          {
            id: Not(resa.id),
            isActive: true,
            id_car: resa.id_car,
            start_date: Between(resa.start_date, end_date),
          },
          {
            id: Not(resa.id),
            isActive: true,
            id_car: resa.id_car,
            end_date: Between(resa.start_date, end_date),
          },
        ],
      });

      if (count > 0)
        throw new HttpException("Can't reserved that car at this moment", 409);

      ok = true;
    }

    const active = isActive.toString() === 'false' ? false : true;
    if (ok === false && active === false) {
      reservation.isActive = active;
      ok = true;
    }

    // rien
    if (ok === false) {
      throw new HttpException('Nothing to update', 400);
    }

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
