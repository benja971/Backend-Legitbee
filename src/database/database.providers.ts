import { Cars } from 'src/cars/entities/cars.entity';
import { Reservations } from 'src/reservations/entities/reservation.entity';
import { Users } from 'src/users/entities/user.entity';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        database: process.env.POSTGRES_DB,
        username: process.env.POSTGRES_USER,
        port: 5432,
        password: process.env.POSTGRES_PASSWORD,
        entities: [Users, Cars, Reservations],
        synchronize: true,
      });
      return await dataSource.initialize();
    },
  },
];
