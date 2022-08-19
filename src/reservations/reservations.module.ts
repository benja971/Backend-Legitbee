import { CarsController } from './../cars/cars.controller';
import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsResolver } from './reservations.resolver';
import { ReservationsController } from './reservations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Car } from 'src/cars/entities/car.entity';
import { CarsResolver } from 'src/cars/cars.resolver';
import { CarsService } from 'src/cars/cars.service';
import { UsersResolver } from 'src/users/users.resolver';
import { UsersService } from 'src/users/users.service';
import { UsersController } from '../users/users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, Car, Reservation])],
  providers: [
    ReservationsResolver,
    ReservationsService,
    CarsResolver,
    CarsService,
    UsersResolver,
    UsersService,
  ],
  controllers: [ReservationsController, CarsController, UsersController],
})
export class ReservationsModule {}
