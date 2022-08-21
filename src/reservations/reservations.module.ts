import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarsModule } from 'src/cars/cars.module';
import { carProviders } from 'src/cars/cars.provider';
import { Cars } from 'src/cars/entities/cars.entity';
import { DatabaseModule } from 'src/database/database.module';
import { UsersModule } from '../users/users.module';
import { userProviders } from '../users/users.provider';
import { Users } from './../users/entities/user.entity';
import { Reservations } from './entities/reservation.entity';
import { ReservationsController } from './reservations.controller';
import { reservationProviders } from './reservations.provider';
import { ReservationsResolver } from './reservations.resolver';
import { ReservationsService } from './reservations.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Cars, Reservations]),
    DatabaseModule,
    forwardRef(() => UsersModule),
    forwardRef(() => CarsModule),
  ], //imort usermodule
  providers: [
    ...reservationProviders,
    ...carProviders,
    ...userProviders,
    ReservationsService,
    ReservationsResolver,
  ],
  controllers: [ReservationsController],
  exports: [ReservationsService],
})
export class ReservationsModule {}
