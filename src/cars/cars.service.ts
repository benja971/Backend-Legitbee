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
    try {
      return await this.carsRepository.save(createCarInput);
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  async findAll() {
    try {
      return await this.carsRepository.find();
    } catch (error) {
      throw new HttpException('Cannot find cars', 400);
    }
  }

  async findOne(id: number) {
    try {
      return await this.carsRepository.findOneBy({ id });
    } catch (error) {
      throw new HttpException('Cannot find this car', 400);
    }
  }

  async update(id: number, updateCarInput: UpdateCarInput) {
    const { model, isActive } = updateCarInput;

    let carToUpdate: Car;
    try {
      carToUpdate = await this.carsRepository.findOneBy({ id });
    } catch (error) {
      throw new HttpException('Cannot find this car', 400);
    }

    if (!carToUpdate) throw new HttpException('Car not found', 404);

    const active = isActive?.toString() === 'false' ? false : true;

    const newCar = new UpdateCarInput(
      id,
      model !== undefined ? model : carToUpdate.model,
      isActive !== undefined ? active : carToUpdate.isActive,
    );

    if (!active) await this.reservationsService.disableReservationsByCarId(id);

    return await this.carsRepository.update(id, newCar);
  }

  async remove(id: number) {
    // delete all the reservations related to the car
    await this.reservationsService.deleteReservationsByCarId(id);

    try {
      return await this.carsRepository.delete(id);
    } catch (error) {
      throw new HttpException('Cannot delete this car', 400);
    }
  }
}
