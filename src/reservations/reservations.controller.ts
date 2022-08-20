import {
  Body,
  Controller,
  Get,
  Post,
  ParseIntPipe,
  Param,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationInput } from './dto/create-reservation.input';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reservationsService.get(id);
  }

  @Post()
  create(@Body() reservation: CreateReservationInput) {
    return this.reservationsService.createReservation(reservation);
  }
}
