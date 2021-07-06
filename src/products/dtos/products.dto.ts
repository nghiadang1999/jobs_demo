import {IsString, IsInt,IsNotEmpty} from 'class-validator';
import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

// export class ProductDTO{
// 	@IsString()
// 	readonly name:string;
// 	@IsInt()
// 	@IsNotEmpty()
// 	readonly cost:number;
// }
@ObjectType()
export class ProductDTO{
	@Field(() => ID)
  	readonly id?: string;
	// @IsString()
	@Field()
	readonly name:string;
	//@IsInt()
	//@IsNotEmpty()
	@Field(() => Int)
	readonly cost:number;
}