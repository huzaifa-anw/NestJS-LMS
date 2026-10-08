import { Module } from '@nestjs/common';
import { UserService } from './user.service.js';
import { User, UserSchema } from '../user/schemas/user.schema.js'
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller.js';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController]
})
export class UserModule {}
  