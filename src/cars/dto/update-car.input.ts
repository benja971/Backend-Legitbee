import { CreateCarInput } from './create-car.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCarInput extends PartialType(CreateCarInput) {
  @Field(() => Int)
  id: number;

  @Field(() => String, { description: 'Car model' })
  model?: string;

  @Field(() => Boolean, {
    description: 'Can the car be reserved ?',
  })
  isActive: boolean;
}
