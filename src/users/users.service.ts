import { Injectable } from '@nestjs/common';
import{User} from './interfaces/users.interface';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Observable,from} from 'rxjs';
// export type User={
//   id:number;
//   name:string;
//   username:string;
//   password:string;
// }

@Injectable()
export class UsersService {
 // private readonly users:User[]=[
 //    {
 //      id:u1,
 //      name: 'Marius',
 //      username:'marius',
 //      password:'sosecure',
 //    },
 //    {
 //      id:u2,
 //      name:'Mambo',
 //      username:'mambo',
 //      password:'dumbo',
 //    },

 //  ];
   constructor(@InjectModel('User') private readonly userModel: Model<User>){}

   async findOne(username:string): Promise<User | undefined>{
   // return this.userModel.find(user => user.username === username);
//  const test=this.userModel.find(user => user.username === username);
   const user= await this.userModel.findOne({username:username});
  // const result= rel.username;
  console.log(user.username);
   return user;
  }

  // async findOne2(id: string): Observable<User>{
  //   return from(this.userModel.findOne({id})).pipe(
  //     Map((user: User) =>{
  //      // console.log(user),
  //       const {password,...result}=user;
  //       return result;
  //     })
  //     )
    
  // }




  async create(user:User): Promise <User>{
    const newUser= new this.userModel(user);
    return await newUser.save();
  }
}
