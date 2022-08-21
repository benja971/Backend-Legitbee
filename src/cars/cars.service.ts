import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { ReservationsService } from 'src/reservations/reservations.service';
import { Repository } from 'typeorm';
import { CreateCarInput } from './dto/create-car.input';
import { UpdateCarInput } from './dto/update-car.input';
import { Car } from './entities/cars.type';

@Injectable()
export class CarsService {
  constructor(
    @Inject('CARS_REPOSITORY')
    private carsRepository: Repository<Car>,
    @Inject(forwardRef(() => ReservationsService))
    private reservationsService: ReservationsService,
  ) {}

  /**
   * Car can be created, edited, and deleted
   * User can get all the cars which are not reserved
   * Cars can be get by their id or by the id of a reservation
   */

  async create(createCarInput: CreateCarInput) {
    return await this.carsRepository.save(createCarInput);
  }

  async findAll() {
    return await this.carsRepository.find();
  }

  async findOne(id: number) {
    return await this.carsRepository.findOneBy({ id });
  }

  async update(id: number, updateCarInput: UpdateCarInput) {
    const { model, isActive } = updateCarInput;

    let ok = false;

    const car = await this.carsRepository.findOneBy({ id });
    if (!car) throw new HttpException('Car not found', 404);

    if (ok === false && model) ok = true;

    const active = isActive.toString() === 'false' ? false : true;
    if (ok === false && active === false) {
      updateCarInput.isActive = active;

      // disable all the reservations related to the car
      await this.reservationsService.disableReservationsByCarId(id);

      ok = true;
    }

    return await this.carsRepository.update(id, updateCarInput);
  }

  async remove(id: number) {
    // delete all the reservations related to the car
    await this.reservationsService.deleteReservationsByCarId(id);
    return await this.carsRepository.delete(id);
  }
}
