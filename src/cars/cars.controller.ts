import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  ParseIntPipe,
  Param,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarInput } from './dto/create-car.input';
import { UpdateCarInput } from './dto/update-car.input';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  create(@Body() createCarInput: CreateCarInput) {
    return this.carsService.create(createCarInput);
  }

  @Put(':idCar')
  update(
    @Param('idCar', ParseIntPipe) idCar: number,
    @Body() updateCarInput: UpdateCarInput,
  ) {
    return this.carsService.update(idCar, updateCarInput);
  }

  @Get()
  findAll() {
    return this.carsService.findAll();
  }

  @Get(':idCar')
  findOne(@Param('idCar', ParseIntPipe) idCar: number) {
    return this.carsService.findOne(idCar);
  }

  findOneReserved(@Param('idResa', ParseIntPipe) idResa: number) {
    return this.carsService.findOneByReservationId(idResa);
  }

  @Delete(':idCar')
  remove(@Param('idCar', ParseIntPipe) idCar: number) {
    return this.carsService.remove(idCar);
  }
}
