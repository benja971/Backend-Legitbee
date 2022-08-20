import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ReservationsService } from './reservations.service';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get(':userId')
  findAll(@Param('userId') userId: number) {
    return this.reservationsService.findAll(userId);
  }

  @Delete(':resaId')
  remove(@Param('resaId') resaId: number) {
    return this.reservationsService.delete(resaId);
  }
}
