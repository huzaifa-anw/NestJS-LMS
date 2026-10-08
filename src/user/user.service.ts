import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from '../auth/dto/registerUser.dto.js';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema.js';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async createUser(registerUserDto: RegisterUserDto) {

        return await this.userModel.create({
            fname: registerUserDto.fname,
            lname: registerUserDto.lname,
            email: registerUserDto.email,
            password: registerUserDto.password
        })

    }

    async findUser(id: string) {
        return await this.userModel.findById(id);
    }
}
