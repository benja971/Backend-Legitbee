import { ParseIntPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Reservation } from './entities/reservation.entity';
import { ReservationsService } from './reservations.service';

@Resolver(() => Reservation)
export class ReservationsResolver {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Query(() => [Reservation], { name: 'reservations' })
  findAll(@Args('userId', ParseIntPipe) userId: number) {
    return this.reservationsService.findAll(userId);
  }

  @Mutation(() => Reservation)
  removeReservation(@Args('id', ParseIntPipe) id: number) {
    return this.reservationsService.delete(id);
  }
}
