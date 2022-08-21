import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Car {
  @Field(() => Int, { description: 'Unique id' })
  id: number;

  @Field(() => String, { description: 'Car model' })
  model: string;

  @Field(() => Boolean, {
    description: 'Can the car be reserved ?',
    defaultValue: true,
  })
  isActive: boolean;
}
