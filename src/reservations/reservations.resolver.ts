import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { ReservationsService } from './reservations.service';
import { Reservation } from './entities/reservation.entity';
import { CreateReservationInput } from './dto/create-reservation.input';
import { UpdateReservationInput } from './dto/update-reservation.input';
import { ParseIntPipe } from '@nestjs/common';

@Resolver(() => Reservation)
export class ReservationsResolver {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Query(() => [Reservation], { name: 'reservations' })
  findAll(@Args('userId', ParseIntPipe) userId: number) {
    return this.reservationsService.findAll(userId);
  }

  @Mutation(() => Reservation)
  createReservation(
    @Args('createReservationInput')
    createReservationInput: CreateReservationInput,
  ) {
    return this.reservationsService.create(createReservationInput);
  }

  @Mutation(() => Reservation)
  updateReservation(
    @Args('id', ParseIntPipe)
    id: number,
    @Args('updateReservationInput')
    updateReservationInput: UpdateReservationInput,
  ) {
    return this.reservationsService.update(id, updateReservationInput);
  }

  @Mutation(() => Reservation)
  removeReservation(@Args('id', ParseIntPipe) id: number) {
    return this.reservationsService.delete(id);
  }
}
