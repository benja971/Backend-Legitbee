import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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

  @Get()
  findAll() {
    return this.carsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.carsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateCarInput: UpdateCarInput) {
    return this.carsService.update(id, updateCarInput);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.carsService.remove(id);
  }
}
