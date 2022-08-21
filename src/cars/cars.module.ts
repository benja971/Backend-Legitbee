import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module';
import { Reservations } from 'src/reservations/entities/reservation.entity';
import { ReservationsModule } from 'src/reservations/reservations.module';
import { CarsController } from './cars.controller';
import { carProviders } from './cars.provider';
import { CarsResolver } from './cars.resolver';
import { CarsService } from './cars.service';
import { Cars } from './entities/cars.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cars, Reservations]),
    DatabaseModule,
    forwardRef(() => ReservationsModule),
  ],
  providers: [...carProviders, CarsService, CarsResolver],
  controllers: [CarsController],
  exports: [CarsService],
})
export class CarsModule {}
