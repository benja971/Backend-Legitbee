import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateReservationInput {
  @Field(() => Int)
  id_car: number;

  @Field(() => Int)
  user_id: number;

  @Field(() => Date)
  start_date: Date;

  @Field(() => Date)
  end_date: Date;
}
