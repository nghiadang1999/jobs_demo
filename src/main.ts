import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {HttpExceptionFilter} from './filters/http-exception.filter';
 import {ValidationExceptionFilter} from './filters/validation-exception.filter';
 import {ValidationPipe} from './jobs/pipes/validation.pipe';
 import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
 import * as session from 'express-session';
 import * as passport from 'passport';
 import * as cookieParser from 'cookie-parser';
 import {AuditMiddleware} from './middlewares/audit.middleware';
 // import {logger} from '@nestjs/common';
declare const module: any;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 
 const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe);
  app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: true,
      cookie: {maxAge: 3600000}
    }),
    );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(cookieParser());
 // app.use(AuditMiddleware);

  await app.listen(3000);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
