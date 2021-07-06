import {Session,UseGuards, Controller, Get, Post,Param, Body,Put, Delete, HttpStatus,HttpException,NotFoundException,Res,Query,Req } from '@nestjs/common';
import {Movie} from'./interfaces/movies.interface';
import {MoviesService} from './movies.service';
import {MovieDTO} from './dtos/movies.dto';
import { serialize } from 'class-transformer';

import {AuthenticatedGuard} from '../auth/authenticated.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthService } from '../auth/auth.service';
import {Roles} from '../auth/decorator/roles.decorator.ts';
//import { Role } from '../auth/enums/role.enum';
import {RolesGuard} from '../auth/role.guard';
// import {Observable} from 'rxjs';
import { Observable, of } from 'rxjs';
// import { PoliciesGuard } from '../auth/policiesguard.guard';
// import { CheckPolicies } from './auth/decorator/checkpolicies.decorator';

//import { Role } from '../author/role.enum';



@Controller('movies')
export class MoviesController {

	constructor(private readonly MoviesService:MoviesService){}

	// @Get()
	// findAll():Promise<Movie[]>{
	// 	return this.MoviesService.findAll();
	// }



	@UseGuards(JwtAuthGuard)
	@Get(':id')
	find(@Param('id') id): Promise <Movie>{
		return this.MoviesService.find(id);
	}

	@Roles('admin')
	@UseGuards(JwtAuthGuard,RolesGuard)
	@Get('/rate/:numrate')
	async rate(@Req() req,@Res() res, @Param('numrate') numrate): Promise <Movie[]>{
		const rerate= await this.MoviesService.rate(numrate);
		if(!rerate) throw new NotFoundException('Movie does not exists');
		console.log(req.headers.authorization);
		return res.status(HttpStatus.OK).json({
			message: 'Movie Rate successfully',
			rerate
		});

	}
	//rate < 9.5
	
	@Get('/rateduoi95/:numrate')
	
	async rateduoi95(@Res() res, @Param('numrate') numrate): Promise <Movie[]>{
		const rerate= await this.MoviesService.rateduoi95(numrate);
		if(!rerate) throw new NotFoundException('Movie does not exists');
		//console.log(query);
		return res.status(HttpStatus.OK).json({
			message: 'Movie Rate successfully',
			rerate
		});

	}

	//action và năm 2014
	@UseGuards(JwtAuthGuard)
	@Get('/genre/:action/:year')
	async genre_action(@Res() res, @Param('action') action, @Param('year') year): Promise <Movie[]>{
		const rerate= await this.MoviesService.genre_action(action,year);
		if(!rerate) throw new NotFoundException('Movie does not exists');
		//console.log(query);
		return res.status(HttpStatus.OK).json({
			message: 'Movie Rate successfully',
			rerate
		});

	}

	//Drama hoặc năm 2014
	@UseGuards(JwtAuthGuard)
	@Get('/genre_dra/:drama/:year')
	async genre_dra(@Req() req,@Res() res, @Param('drama') drama, @Param('year') year): Promise <Movie[]>{
		const rerate= await this.MoviesService.genre_dra(drama,year);
		if(!rerate) throw new NotFoundException('Movie does not exists');
		//console.log(query);
		//const title=serialize(rerate);
		// var objJson1=JSON.stringify(rerate);
		// var objJson2 = JSON.parse(objJson1);
		// var kqtitle=objJson2.title as string;
		console.log('Session: ',req.user);
		return res.status(HttpStatus.OK).json({
			message: 'Movie Rate successfully',
			rerate,
			
		});
		// return {rerate: serialize(rerate)};

	}

	@UseGuards(JwtAuthGuard)
	@Get('/genre/:type')
	async genre(@Res() res, @Param('type') type): Promise <Movie[]>{
		const resultgenre= await this.MoviesService.genre(type);
		if(!resultgenre) throw new NotFoundException('Movie does not exists');
		//console.log(query);
		return res.status(HttpStatus.OK).json({
			message: 'Movie Rate successfully',
			resultgenre
		});

	}
	// @Get('vor')
	// async rate(): Promise <Movie[]>{
	// 	// const rerate= await this.MoviesService.rate();
	// 	// return res.status(HttpStatus.OK).json({
	// 	// 	message: 'Movie Rate successfully',
	// 	// 	rerate
	// 	// })
	// 	return await this.MoviesService.rate();
	// }
	@UseGuards(JwtAuthGuard)
	@Post()
	async create(@Res() res ,@Body() movie: MovieDTO): Promise<Movie>{
		const createmovie= await this.MoviesService.create(movie);
		return res.status(HttpStatus.OK).json({
			message: 'Movie Created successfully',
			createmovie
		})
	}

	@UseGuards(JwtAuthGuard)
	@Put(':id')

	update(@Param('id') id, @Body() movie: MovieDTO): Promise<Movie>{
		return this.MoviesService.update(id,movie);
	}
	// @Delete(':id')
	// delete(@Param('id') id):Promise<Movie>{
	// 	return this.MoviesService.delete(id);
	// }
	@UseGuards(JwtAuthGuard)
	@Delete('/delete')
	async delete(@Res() res, @Query('movieId') movieId):Promise<Movie>{
		const movieDeleted=await this.MoviesService.delete(movieId);
		if(!movieDeleted) throw new NotFoundException('Movie does not exists');
		return res.status(HttpStatus.OK).json({
			message: 'Movie Deleted successfully',
			movieDeleted
		})
		//return this.MoviesService.delete(id);
	}
}
