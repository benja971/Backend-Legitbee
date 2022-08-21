import { CarsResolver } from './cars.resolver';
import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cars } from './entities/cars.entity';
import { carProviders } from './cars.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cars]), DatabaseModule],
  providers: [...carProviders, CarsService, CarsResolver],
  controllers: [CarsController],
  exports: [CarsService],
})
export class CarsModule {}
