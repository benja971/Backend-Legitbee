import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateReservationInput {
  @Field(() => Int)
  carId: number;

  @Field(() => Int)
  userId: number;

  @Field(() => Date)
  startDate: Date;

  @Field(() => Date)
  endDate: Date;
}
