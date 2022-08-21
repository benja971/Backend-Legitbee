import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => Int)
  id: number;

  @Field(() => String, { description: 'name of the User' })
  name?: string;

  @Field(() => Boolean, { description: "Is the user's account is active ?" })
  isActive?: boolean;
}
