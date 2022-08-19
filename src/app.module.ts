import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { CarsModule } from './cars/cars.module';
import { CarsController } from './cars/cars.controller';
import { ReservationsModule } from './reservations/reservations.module';
import { ReservationsController } from './reservations/reservations.controller';
import { Car } from './cars/entities/car.entity';
import { Reservation } from './reservations/entities/reservation.entity';
import { CarsService } from './cars/cars.service';
import { UsersService } from './users/users.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ReservationsService } from './reservations/reservations.service';
import { ConfigModule } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ec2-52-30-75-37.eu-west-1.compute.amazonaws.com',
      database: 'dc9n4oaah79rir',
      username: 'bvmacnaytiesct',
      port: 5432,
      password:
        '2a0ad6303a39580c7e44b796a2a933a4c495d310b7264f10a6df4cfae6ab35d9',
      entities: [User, Car, Reservation],
      synchronize: true,
    }),
    UsersModule,
    CarsModule,
    ReservationsModule,
  ],
  controllers: [
    AppController,
    UsersController,
    CarsController,
    ReservationsController,
  ],
  providers: [AppService, CarsService, UsersService, ReservationsService],
})
export class AppModule {}
