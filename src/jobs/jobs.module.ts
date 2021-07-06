import { Module,MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from '../app.controller';
import {MongooseModule} from '@nestjs/mongoose'
import { AppService } from '../app.service';
import { JobsController } from './jobs.controller';
import {JobsService} from './jobs.service';
// import {JobsModule} from './jobs/jobs.module';
import {JobSchema} from './schema/jobs.schema';
import {AuditMiddleware} from '../middlewares/audit.middleware';
//import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [MongooseModule.forFeature([{name:'Job',schema:JobSchema}])],
    // CacheModule.register({
    //   ttl: 5,
    //   max: 100
    // })
  controllers: [ JobsController],
  providers: [JobsService],
})
export class JobsModule {
}
