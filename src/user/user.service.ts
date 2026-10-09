import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterUserDto } from '../auth/dto/registerUser.dto.js';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema.js';
import { Model } from 'mongoose';


@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async createUser(registerUserDto: RegisterUserDto) {

        try {
            return await this.userModel.create({
                fname: registerUserDto.fname,
                lname: registerUserDto.lname,
                email: registerUserDto.email,
                password: registerUserDto.password
            })
        }   
        catch (e) {
            console.log(e)
            const err = e as {code?: number}

            const DUPLICATE_KEY_ERROR_CODE = 11000;
            
            if (err.code === DUPLICATE_KEY_ERROR_CODE) {
                throw new ConflictException("Email is already taken");
            }

            throw e;
        }

    }

    async findUser(id: string) {
        return await this.userModel.findById(id);
    }

    async findUserByEmail(email: string) {
        try {
            return await this.userModel.findOne({email});
        } catch (e) {
            console.log(e)
        }
    }
}
