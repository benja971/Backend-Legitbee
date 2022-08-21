import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateReservationInput } from './dto/create-reservation.input';
import { UpdateReservationInput } from './dto/update-reservation.input';
import { ReservationsService } from './reservations.service';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reservationsService.get(id);
  }

  @Get()
  findAll() {
    return this.reservationsService.getAll();
  }

  @Post()
  create(@Body() reservation: CreateReservationInput) {
    return this.reservationsService.createReservation(reservation);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() reservation: UpdateReservationInput,
  ) {
    return this.reservationsService.updateReservation(id, reservation);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.reservationsService.deleteReservation(id);
  }

  @Get('user/:id')
  getReservationsByUser(@Param('id', ParseIntPipe) id: number) {
    return this.reservationsService.getAllForUser(id);
  }
}
