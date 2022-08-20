import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'ec2-52-30-75-37.eu-west-1.compute.amazonaws.com',
        database: 'dc9n4oaah79rir',
        username: 'bvmacnaytiesct',
        port: 5432,
        password:
          '2a0ad6303a39580c7e44b796a2a933a4c495d310b7264f10a6df4cfae6ab35d9',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });
      return await dataSource.initialize();
    },
  },
];
