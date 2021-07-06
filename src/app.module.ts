import { Module,MiddlewareConsumer,NestModule,forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobsController } from './jobs/jobs.controller';
// import { JobsService } from './jobs/jobs.service';
import {JobsModule} from './jobs/jobs.module';
import {MongooseModule} from '@nestjs/mongoose';
import { ProductsController } from './products/products.controller';
import {ProductsModule} from './products/products.module';
import {ChatGateway} from './chat.gateway';
import { MoviesController } from './movies/movies.controller';
// import { MoviesService } from './movies/movies.service';
import { MoviesModule } from './movies/movies.module';
import { UsersModule } from './users/users.module';
 import { AuthService } from './auth/auth.service';
 import { AuthModule } from './auth/auth.module';
import {AuditMiddleware} from './middlewares/audit.middleware';
import { GraphQLModule } from '@nestjs/graphql';
import { APP_GUARD } from '@nestjs/core';
import {RolesGuard} from './auth/role.guard';

@Module({
  imports: [
  GraphQLModule.forRoot({
   autoSchemaFile: 'schema.gql',}),
  forwardRef(() =>UsersModule),
  ProductsModule,
  JobsModule,
  MoviesModule,
  MongooseModule.forRoot('mongodb+srv://test:12345@cluster0.kxt5d.mongodb.net/job?retryWrites=true&w=majority'),
  forwardRef(() =>AuthModule)],
  controllers: [AppController],
  
  providers: [
  {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },
  AppService,
  ChatGateway,
  AuthService]
})
export class AppModule {

}
