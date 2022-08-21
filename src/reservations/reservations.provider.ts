import { DataSource } from 'typeorm';
import { Reservations } from './entities/reservation.entity';

export const reservationProviders = [
  {
    provide: 'RESERVATIONS_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Reservations),
    inject: ['DATA_SOURCE'],
  },
];
