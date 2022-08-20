import { CreateReservationInput } from './create-reservation.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateReservationInput extends PartialType(
  CreateReservationInput,
) {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  id_car?: number;

  @Field(() => Int)
  id_user?: number;

  @Field(() => Date)
  start_date?: Date;

  @Field(() => Date)
  end_date?: Date;

  @Field(() => Boolean)
  isActive?: boolean;
}
