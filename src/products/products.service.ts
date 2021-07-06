import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Product} from './interfaces/products.interface';

@Injectable()
export class ProductsService {
	constructor (@InjectModel('Product') private readonly productsModel: Model <Product>){}

	async findAll(): Promise<Product[]>{
		return await this.productsModel.find({});
	}
	async find(id:string): Promise<Product>{
		const oneproduct=await this.productsModel.findOne({_id:id});
		const title="aaaaaaa";
		console.log(oneproduct)
		return oneproduct;
	}
	async create(product: Product): Promise<Product>{
		const newProduct= new this.productsModel(product);
		return await newProduct.save();
	}
	async update(id:string,product:Product): Promise<Product>{
		return await this.productsModel.findByIdAndUpdate(id,product,{new:true});
	}
	async delete(id:string): Promise<Product>{
		return await this.productsModel.findByIdAndRemove(id);
	}

}
