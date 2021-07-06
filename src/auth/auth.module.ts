import { Module,forwardRef } from '@nestjs/common';
import {UsersModule} from '../users/users.module';
import {AuthService} from './auth.service';
import {PassportModule} from '@nestjs/passport';
import {LocalStrategy} from './local.strategy';
import {SessionSerializer} from './session.serializer';
import {JwtModule} from '@nestjs/jwt';
 import {JwtStrategy} from './jwt.strategy';
 import {UsersService} from '../users/users.service';
 import {RolesGuard} from './role.guard';

@Module({
	// imports:[UsersModule,PassportModule.register({session: true})],
	// providers:[AuthService,LocalStrategy,SessionSerializer],
	imports:[forwardRef(() =>UsersModule),PassportModule, JwtModule.register({
		secret: "SECRET",
      	signOptions: { expiresIn: '60s' }
	})],
	providers:[AuthService,LocalStrategy,SessionSerializer,JwtStrategy, RolesGuard],
	exports: [AuthService,JwtModule],
})
export class AuthModule {}
