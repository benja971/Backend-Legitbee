import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String, { description: 'Firstname of the User' })
  firstName?: string;

  @Field(() => String, { description: 'Lastname of the User' })
  lastName?: string;

  @Field(() => String, { description: 'Email of the User' })
  email?: string;

  @Field(() => String, { description: 'Password of the User' })
  password?: string;

  @Field(() => Boolean, { description: 'Is the User active?' })
  isActive?: boolean;
}
