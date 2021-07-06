// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import {ROLES_KEY} from './decorator/roles.decorator';
// import { Role } from './enums/role.enum';

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean {
//     const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
//       context.getHandler(),
//       context.getClass(),
//     ]);
//     if (!requiredRoles) {
//       return true;
//     }
//     const { user } = context.switchToHttp().getRequest();
//     return requiredRoles.some((role) => user.roles?.includes(role));
//   }
// }
// import { Injectable, CanActivate, ExecutionContext, Inject,forwardRef  } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import {ROLES_KEY} from './decorator/roles.decorator';
// import {UsersService} from '../users/users.service';
// import { hasRoles } from "./decorator/roles.decorator";
// import { User } from "../users/interfaces/users.interface";
// import {Observable} from 'rxjs';

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(
//     private reflector: Reflector,
//     @Inject(forwardRef(()=>UsersService))
//     private usersService: UsersService
//     ) {}

//   canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
//     // const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
//     //   context.getHandler(),
//     //   context.getClass(),
//     // ]);
//     // if (!requiredRoles) {
//     //   return true;
//     // }
//     // const { user } = context.switchToHttp().getRequest();
//     // return requiredRoles.some((role) => user.role?.includes(role));
//     const roles= this.reflector.get<string[]>(ROLES_KEY,context.getHandler());
//     if(!roles){
//       return true;
//     }
//     const request=context.switchToHttp().getRequest();
//     const user: User=request.user;

//     return this.usersService.findOne2(user.id).pipe(
//       Map((user:User) =>{
//        const hasRole = () => roles.indexOf(user.role) > -1;
//                 let hasPermission: boolean = false;

//                 if (hasRole()) {
//                     hasPermission = true;
//                 };
//                 return user && hasPermission;
//       })
//     )
//   }
// }
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
 
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
 
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler()); // The role group information obtained from the controller annotation.
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const hasRole = () => user.roles.some((role) => roles.includes(role)); // Whether to match the role
    return user && user.roles && hasRole();
  }
}