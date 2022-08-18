import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCarInput } from './dto/create-car.input';
import { UpdateCarInput } from './dto/update-car.input';
import { Car } from './entities/car.entity';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private usersRepository: Repository<Car>,
  ) {}

  create(createCarInput: CreateCarInput) {
    return this.usersRepository.save(createCarInput);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  update(id: number, updateCarInput: UpdateCarInput) {
    return this.usersRepository.update(id, updateCarInput);
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }
}
