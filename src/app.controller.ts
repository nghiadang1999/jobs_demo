import { Controller, Get, Post, Request, UseGuards,Res } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import {LocalAuthGuard} from './auth/local-auth.guard';
import {AuthenticatedGuard} from './auth/authenticated.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthService } from './auth/auth.service';


@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getnew();
  // }
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req, @Res() res): any{
  // return this.authService.login(req.user);
   const {user} = req;
  const cookie = this.authService.login(req.user);
  // res.setHeader('Set-Cookie', cookie);
  user.password = undefined;
  console.log(cookie);
  return res.send(user);
  }


  @UseGuards(JwtAuthGuard)
  @Get('protect')
  getHello(@Request() req): string{
    return req.user;
  }

}
