import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service.js';
import { RegisterUserDto } from './dto/registerUser.dto.js';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor (private readonly userService: UserService) {}
    async registerUser(registerUserDto: RegisterUserDto) {

        console.log('logging register user request body....')
        console.log(registerUserDto);

        const saltRounds = 10;
        const hash = await bcrypt.hash(registerUserDto.password, saltRounds);

        return await this.userService.createUser({...registerUserDto, password: hash});
    }
}
