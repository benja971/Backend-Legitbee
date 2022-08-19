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

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCarInput: UpdateCarInput,
  ) {
    return this.carsService.update(updateCarInput.id, updateCarInput);
  }

  @Get()
  findAll() {
    return this.carsService.findAll();
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.carsService.remove(id);
  }
}
