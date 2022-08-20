import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarsModule } from 'src/cars/cars.module';
import { carProviders } from 'src/cars/cars.provider';
import { Car } from 'src/cars/entities/car.entity';
import { DatabaseModule } from 'src/database/database.module';
import { UsersModule } from '../users/users.module';
import { User } from './../users/entities/user.entity';
import { Reservation } from './entities/reservation.entity';
import { ReservationsController } from './reservations.controller';
import { reservationProviders } from './reservations.provider';
import { ReservationsService } from './reservations.service';
import { userProviders } from '../users/users.provider';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Car, Reservation]),
    DatabaseModule,
    UsersModule,
    CarsModule,
  ], //imort usermodule
  providers: [
    ...reservationProviders,
    ...carProviders,
    ...userProviders,
    ReservationsService,
  ],
  controllers: [ReservationsController],
})
export class ReservationsModule {}
