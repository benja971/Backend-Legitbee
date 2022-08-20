import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateCarInput } from './dto/create-car.input';
import { UpdateCarInput } from './dto/update-car.input';
import { Car } from './entities/car.type';

@Injectable()
export class CarsService {
  constructor(
    @Inject('CARS_REPOSITORY')
    private carsRepository: Repository<Car>,
  ) {}

  /**
   * Car can be created, edited, and deleted
   * User can get all the cars which are not reserved
   * Cars can be get by their id or by the id of a reservation
   */

  create(createCarInput: CreateCarInput) {
    return this.carsRepository.save(createCarInput);
  }

  findAll() {
    return this.carsRepository.find();
  }

  findOne(id: number) {
    return this.carsRepository.findOneBy({ id });
  }

  update(id: number, updateCarInput: UpdateCarInput) {
    return this.carsRepository.update(id, updateCarInput);
  }

  remove(id: number) {
    return this.carsRepository.delete(id);
  }
}
