import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateCarInput } from './dto/create-car.input';
import { UpdateCarInput } from './dto/update-car.input';
import { Car } from './entities/cars.type';

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

  async create(createCarInput: CreateCarInput) {
    return await this.carsRepository.save(createCarInput);
  }

  findAll() {
    return this.carsRepository.find();
  }

  async findOne(id: number) {
    return await this.carsRepository.findOneBy({ id });
  }

  async update(id: number, updateCarInput: UpdateCarInput) {
    return await this.carsRepository.update(id, updateCarInput);
  }

  async remove(id: number) {
    return await this.carsRepository.delete(id);
  }
}
