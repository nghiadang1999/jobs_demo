import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import {ProductsService} from './products.service';

import {ProductDTO} from './dtos/products.dto';
import {ProductInput} from './input-products.input';
import {Product} from './interfaces/products.interface';

@Resolver(of => ProductDTO)
export class ProductsResolver {
	constructor (private readonly productService: ProductsService){}

	@Query(returns => [ProductDTO])
	async products(): Promise <ProductDTO[]>{
		return this.productService.findAll();
	}

	@Query(returns => ProductDTO)
	async oneproduct(@Args('id') id:string): Promise <ProductDTO>{
		//console.log(title);
		const data=this.productService.find(id);
		return data;
	}

	@Mutation(returns => ProductDTO)
	async create(@Args('input') input:ProductInput): Promise<ProductDTO>{
		return this.productService.create(input);
	}

	@Mutation(returns => ProductDTO)
	async update(@Args('id') id: string, @Args('input') input: ProductInput){
		return this.productService.update(id,input as Product);
	}

	@Mutation(returns => ProductDTO)
	async delete(@Args('id') id: string){
		return this.productService.delete(id);
	}
}
