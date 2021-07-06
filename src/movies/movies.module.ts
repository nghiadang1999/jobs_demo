import { Module,RequestMethod,forwardRef } from '@nestjs/common';
 import {MongooseModule} from '@nestjs/mongoose';
 import {MoviesController} from './movies.controller';
 import {MovieSchema} from './schema/movies.schema';
 import {MoviesService} from './movies.service';
 // import {RolesGuard} from '../auth/role.guard';

@Module({
  imports: [
  MongooseModule.forFeature([{name:'Movie',schema:MovieSchema}])],
  controllers: [ MoviesController],
  providers: [MoviesService]
})
export class MoviesModule{}