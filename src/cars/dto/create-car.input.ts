import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCarInput {
  @Field(() => String, { description: 'Model of the car' })
  model: string;

  @Field(() => Boolean, {
    description: 'Can the car be reserved ?',
    defaultValue: true,
  })
  isActive: boolean;
}
