import { UpdateReservationInput } from './dto/update-reservation.input';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateReservationInput } from './dto/create-reservation.input';
import { Reservation } from './entities/reservation.type';
import { ReservationsService } from './reservations.service';

@Resolver(() => Reservation)
export class ReservationsResolver {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Query(() => [Reservation], { name: 'getAllReservations' })
  findAll() {
    return this.reservationsService.getAll();
  }

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

  @Mutation(() => Reservation, { name: 'updateReservation' })
  updateReservation(
    @Args('id') id: number,
    @Args('reservation') reservation: UpdateReservationInput,
  ) {
    return this.reservationsService.updateReservation(id, reservation);
  }

  @Mutation(() => Reservation, { name: 'deleteReservation' })
  deleteReservation(@Args('id') id: number) {
    return this.reservationsService.deleteReservation(id);
  }

  @Query(() => [Reservation], { name: 'getReservationsByUser' })
  getReservationsByUser(@Args('id') id: number) {
    return this.reservationsService.getAllForUser(id);
  }
}
