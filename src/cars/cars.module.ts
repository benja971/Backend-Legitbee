import { carProviders } from './cars.provider';
import { ReservationsController } from './../reservations/reservations.controller';
import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsResolver } from './cars.resolver';
import { CarsController } from './cars.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { ReservationsService } from '../reservations/reservations.service';
import { Reservation } from 'src/reservations/entities/reservation.entity';
import { ReservationsResolver } from '../reservations/reservations.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Car, Reservation])],
  providers: [
    ...carProviders,
    CarsResolver,
    CarsService,
    ReservationsResolver,
    ReservationsService,
  ],
  controllers: [CarsController, ReservationsController],
})
export class CarsModule {}
