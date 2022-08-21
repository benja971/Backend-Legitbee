import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'Name of the User' })
  name: string;

  @Field(() => Boolean, {
    description: "Is the user's account is active ?",
    defaultValue: true,
  })
  isActive: boolean;
}
