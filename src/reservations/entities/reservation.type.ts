import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Reservation {
  @Field(() => Int, { description: 'Unique id' })
  id: number;

  @Field(() => Int, { description: 'Id of the reserved car' })
  id_car: number;

  @Field(() => Int, { description: 'Id of the reserver' })
  id_user: number;

  @Field(() => Date, { description: 'Start date of the reservation' })
  start_date: Date;

  @Field(() => Date, { description: 'End date of the reservation' })
  end_date: Date;

  @Field(() => Boolean, {
    description: 'Is the reservation active',
    defaultValue: true,
  })
  isActive: boolean;
}
