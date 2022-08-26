import { CreateReservationInput } from './create-reservation.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateReservationInput extends PartialType(
  CreateReservationInput,
) {
  constructor(
    id: number,
    id_car: number,
    id_user: number,
    start_date: Date,
    end_date: Date,
    isActive: boolean,
  ) {
    super();
    this.id = id;
    this.id_car = id_car;
    this.id_user = id_user;
    this.start_date = start_date;
    this.end_date = end_date;
    this.isActive = isActive;
  }

  @Field(() => Int)
  id: number;

  @Field(() => Int)
  id_car?: number;

  @Field(() => Date)
  start_date?: Date;

  @Field(() => Date)
  end_date?: Date;

  @Field(() => Boolean)
  isActive?: boolean;
}
