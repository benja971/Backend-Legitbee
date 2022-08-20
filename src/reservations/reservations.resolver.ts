import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateReservationInput } from './dto/create-reservation.input';
import { Reservation } from './entities/reservation.type';
import { ReservationsService } from './reservations.service';

@Resolver(() => Reservation)
export class ReservationsResolver {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Query(() => Reservation, { name: 'findOneReservation' })
  findOne(@Args('id') id: number) {
    return this.reservationsService.get(id);
  }

  @Mutation(() => Reservation, { name: 'createReservation' })
  createReservation(
    @Args('reservation')
    reservation: CreateReservationInput,
  ) {
    return this.reservationsService.createReservation(reservation);
  }
}
