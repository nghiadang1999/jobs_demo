import { Injectable } from '@nestjs/common';
import {UsersService} from '../users/users.service';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor (
		private usersService:UsersService,
		private jwtService:JwtService
		){}

	async validateUser(username: string, password:string){
		const user=await this.usersService.findOne(username);
		// console.log('user', user);
		// console.log('pass', password);
		if(user && user.password==password){
			const { password, ...result} = user;
     	 return result;
		}
		return null;
	}

	async login (user: any){
		const payload={name: user.name, sub: user.id, pass: user.password};
		const token=this.jwtService.sign(payload)
	//	console.log(token);
		return {
			token
		}
	}
}
