import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { UserModule } from './user/user.module.js';
// mongoose import (ORM)
import { MongooseModule } from '@nestjs/mongoose';
// config module import (for env variables)
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule, 
    UserModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_URL as string),
  ],

  controllers: [AppController],
  
  providers: [AppService],
})
export class AppModule {}
