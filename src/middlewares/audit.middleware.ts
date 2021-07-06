import {NestMiddleware,Injectable} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuditMiddleware implements NestMiddleware{
	use(req:Request,res: Response,next: NextFunction){
		console.log('IP:', req.ip);
		console.log('Path:', req.path);
		console.log('Headers:', req.headers);
		//console.log('Request...');
    	next();
	}
}