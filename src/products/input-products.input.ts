import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class ProductInput {
  @Field()
  readonly name: string;
  @Field(() => Int)
  readonly cost: number;
}