import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Car {
  @Field(() => Int, { description: 'Unique id' })
  id: number;

  @Field(() => String, { description: 'Car model' })
  model: string;
}
