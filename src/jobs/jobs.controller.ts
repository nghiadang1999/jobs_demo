import { UseGuards,Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus, UseFilters } from '@nestjs/common';
import {JobsService} from './jobs.service';
import {JobDTO} from './dtos/jobs.dto';
import {Job} from './interfaces/jobs.interface';
import {JobData} from '../decorators/jobdata.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
 // import {ValidationPipe} from '../jobs/pipes/validation.pipe';
 // import {ValidationExceptionFilter} from '../filters/validation-exception.filter';
@Controller('job')
export class JobsController {
	constructor(private readonly JobsService:JobsService){}

	@Get()
	findAll(): Promise<Job[]>{
		return this.JobsService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	// @cacheTTL(35)
	// @UseFilters(ValidationPipe)
	find(@Param('id') id):Promise<Job>{
		return this.JobsService.find(id)
				.then((result) =>{
					if(result){
						return result;
					}else{
						throw new HttpException('Job not  found ',HttpStatus.NOT_FOUND);
					}
				})
				.catch(() =>{
						throw new HttpException('Job not  found ',HttpStatus.NOT_FOUND);
				});
	}
	// @Post()
	// create(@Body() job:JobDTO): Promise<Job>{
	// 	return this.JobsService.create(job);
	// }
	@Post()
	//@UseFilters(new ValidationExceptionFilter())
	create(@Body() job:JobDTO): Promise<Job>{
		return this.JobsService.create(job);
	}
	@Put(':id')
	update(@Param('id') id, @Body() job: JobDTO):Promise<Job>{
		return this.JobsService.update(id,job);
	}
	@Delete(':id')
	delete(@Param('id') id):Promise<Job>{
		return this.JobsService.delete(id);
	}
}
