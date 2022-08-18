import { CreateCarInput } from './create-car.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCarInput extends PartialType(CreateCarInput) {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  model?: string;

  @Field(() => Boolean, { nullable: true })
  isReserved?: boolean;
}