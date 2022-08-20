import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int, { description: 'Unique id' })
  id: number;

  @Field(() => String, { description: 'User name' })
  name: string;
}
