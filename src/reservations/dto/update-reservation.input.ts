import { CreateReservationInput } from './create-reservation.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateReservationInput extends PartialType(
  CreateReservationInput,
) {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  carId?: number;

  @Field(() => Int)
  userId?: number;

  @Field(() => Date)
  startDate?: Date;

  @Field(() => Date)
  endDate?: Date;

  @Field(() => Boolean)
  isAlive?: boolean;
}
