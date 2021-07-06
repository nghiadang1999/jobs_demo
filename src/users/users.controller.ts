import {UseGuards, Controller, Req, Res, Post, Get, Body,HttpStatus,Param } from '@nestjs/common';
import {UsersService} from './users.service';
import {UserDTO} from './dtos/users.dto';
import {User} from './interfaces/users.interface';
// import { Roles } from '../auth/decorator/role.decorator';
// import {RolesGuard} from '../auth/role.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
// import { SetMetadata } from '@nestjs/common';


@Controller('users')
export class UsersController {
	constructor(private readonly UsersService:UsersService){}

	// @UseGuards(JwtAuthGuard)
	@Post('/createuser')
	async create(@Res() res, @Body() user:UserDTO): Promise <User>{
		const createuser=await this.UsersService.create(user);
		return res.status(HttpStatus.OK).json({
			message: 'Movie Created successfully',
			createuser
		})
	}
	@UseGuards(JwtAuthGuard)
	@Get('/find/:username')
	async findOne(@Res() res, @Param('username') username): Promise <User>{
		const findname=await this.UsersService.findOne(username);
		return res.status(HttpStatus.OK).json({
			message: 'Movie Created successfully',
			findname
		})
	}
}
