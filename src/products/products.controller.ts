import { Controller, Get, Post, Put, Delete, Param, Body, HttpStatus,HttpException } from '@nestjs/common';
import {Product} from './interfaces/products.interface';
import {ProductsService} from './products.service';
import {ProductDTO} from './dtos/products.dto';

@Controller('products')
export class ProductsController {
constructor(private readonly ProductsService:ProductsService){}
	

	// @Post(/register)
	// register(): Promise<Product[]>{
	// 	return this.ProductsService.register()
	// }
	// @Post(/login)
	// login(): Promise<Product[]>{
	// 	return this.ProductsService.findAll()
	// }



	@Get()
	findAll(): Promise<Product[]>{
		return this.ProductsService.findAll()
	}

	@Get(':id')
	find(@Param('id') id): Promise<Product>{
		return this.ProductsService.find(id)
				.then((result) => {
					if (result){
						return result;
					}else{
						throw new HttpException('Products not found', HttpStatus.NOT_FOUND);
					}
				})
				.catch(()=>{
					throw new HttpException('Products not found', HttpStatus.NOT_FOUND);
				})
	}

	@Post()
	create(@Body() product:ProductDTO): Promise<Product>{
		return this.ProductsService.create(product)
	}

	@Put(':id')
	update(@Param('id') id,@Body() product:ProductDTO): Promise<Product>{
		return this.ProductsService.update(id,product)
	}

	@Delete(':id')
	delete(@Param('id') id): Promise<Product>{
		return this.ProductsService.delete(id)
	}
}
	
