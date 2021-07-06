import { Module,forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
 import {MongooseModule} from '@nestjs/mongoose';
 import {UserSchema} from './schema/users.schema';
 import { AuthModule } from '../auth/auth.module';
  import { AuthService } from '../auth/auth.service';

@Module({
  imports:[
  forwardRef(() =>AuthModule),
  MongooseModule.forFeature([{name:'User',schema:UserSchema}])],
  providers: [UsersService,AuthService],
   exports: [UsersService],
   controllers: [UsersController]
})
export class UsersModule {}
