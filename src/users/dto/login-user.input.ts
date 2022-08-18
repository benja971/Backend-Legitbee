import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LoginUserInput {
  @Field(() => String, { description: 'Email of the User' })
  email: string;

  @Field(() => String, { description: 'Password of the User' })
  password: string;
}
