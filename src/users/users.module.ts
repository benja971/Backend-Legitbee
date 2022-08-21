import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { UsersController } from './users.controller';
import { userProviders } from './users.provider';
import { UsersService } from './users.service';
import { DatabaseModule } from '../database/database.module';
import { UsersResolver } from './users.resolver';
import { Reservations } from 'src/reservations/entities/reservation.entity';
import { ReservationsModule } from 'src/reservations/reservations.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Reservations]),
    DatabaseModule,
    forwardRef(() => ReservationsModule),
  ],
  providers: [...userProviders, UsersService, UsersResolver],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
