import { DataSource } from 'typeorm';
import { Cars } from './entities/cars.entity';

export const carProviders = [
  {
    provide: 'CARS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Cars),
    inject: ['DATA_SOURCE'],
  },
];
