import { Injectable } from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {Movie} from './interfaces/movies.interface';


@Injectable()
export class MoviesService {
	constructor(@InjectModel('Movie') private readonly movieModel: Model<Movie>){}

	async findAll(): Promise <Movie[]>{
		return await this.movieModel.find({});
	}
	async find(id:string): Promise <Movie>{
		return await this.movieModel.findOne({_id:id});
	}


	async rate(numrate:number): Promise <Movie[]>{
	//	(typeof(rate));
		var resultrate= await this.movieModel.find({"meta.rating":numrate});
	//	console.log(resultrate);
	//	console.log(typeof(resultrate));
		var rel= JSON.stringify(resultrate);
	//	console.log(rel);
	//	console.log(typeof(rel));
	//	console.log(JSON.parse(rel)[0].meta.runtime);

		return resultrate;
	}
	async rateduoi95(numrate:number): Promise <Movie[]>{
	//	(typeof(rate));
		const resultrate= await this.movieModel.find({"meta.rating":{$lt:numrate}});
		console.log(resultrate);

		return resultrate;
	}

	//action và năm 2014
	async genre_action(action:string, year: string): Promise <Movie[]>{
	//	(typeof(rate));
		const resultgenre= await this.movieModel.find({genre:action, "meta.aired":year});
		console.log(resultgenre);

		return resultgenre;
	}

	//drama hoặc năm 2014
	async genre_dra(drama:string, year: string): Promise <Movie[]>{
	//	(typeof(rate));
		const resultgenre= await this.movieModel.find({$or :[{genre:drama}, {"meta.aired":year}]});
		console.log(resultgenre);
	//	var objJson1 = JSON.parse(JSON.stringify(resultgenre));
	//	console.log(${this.title});
		var objJson1=JSON.stringify(resultgenre);
		var objJson2 = JSON.parse(objJson1);
		var kqtitle=objJson2.visitors;
		console.log(kqtitle);
		return resultgenre;
	}

	async genre(type:string): Promise <Movie[]>{
	//	(typeof(rate));
		const resultgenre= await this.movieModel.find({genre:type});
		console.log(resultgenre);

		return resultgenre;
	}

	async create(movie:Movie): Promise<Movie>{
		const newMovie=new this.movieModel(movie);

		return await newMovie.save();
	}
	async update(id:string,movie:Movie): Promise<Movie>{
		return await this.movieModel.findByIdAndUpdate(id,movie,{new:true});
	}
	async delete(movieId:string): Promise<Movie>{
		const deletemovie= await this.movieModel.findByIdAndRemove(movieId);
		return deletemovie;
	}
}
