import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from '../app.controller';
import {MongooseModule} from '@nestjs/mongoose'
import { AppService } from '../app.service';
import {ProductsController} from './products.controller';
//import {AuditMiddleware} from '../middlewares/audit.middleware';
import { ProductsService } from './products.service';
// import {Product} from './interfaces/products.interface';
import {ProductSchema} from './schema/products.schema';
import { ProductsResolver } from './products.resolver';

@Module({
  imports: [MongooseModule.forFeature([{name:'Product',schema:ProductSchema}])],

  controllers: [ ProductsController],
  providers: [ProductsService, ProductsResolver],
})
// export class ProductsModule implements NestModule{
//   // configure(consumer: MiddlewareConsumer){
//   //   consumer
//   //   .apply(AuditMiddleware)
//   //   .forRoutes({path: 'job/*',method: RequestMethod.DELETE});
//   // }
// }
export class ProductsModule{}