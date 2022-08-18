import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateReservationInput } from './dto/create-reservation.input';
import { UpdateReservationInput } from './dto/update-reservation.input';
import { ReservationsService } from './reservations.service';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get(':userId')
  findAll(@Param('userId') userId: number) {
    return this.reservationsService.findAll(userId);
  }

  @Post()
  create(@Body() createReservationInput: CreateReservationInput) {
    return this.reservationsService.create(createReservationInput);
  }

  @Put(':resaId')
  update(
    @Param('resaId') resaId: number,
    @Body() updateReservationInput: UpdateReservationInput,
  ) {
    return this.reservationsService.update(resaId, updateReservationInput);
  }

  @Delete(':resaId')
  remove(@Param('resaId') resaId: number) {
    return this.reservationsService.delete(resaId);
  }
}
