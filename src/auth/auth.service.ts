import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service.js';
import { RegisterUserDto } from './dto/registerUser.dto.js';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/loginUser.dto.js';

@Injectable()
export class AuthService {

    constructor (
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}
    
    async registerUser(registerUserDto: RegisterUserDto) {

        console.log('logging register user request body....')
        console.log(registerUserDto);

        const saltRounds = 10;
        const hash = await bcrypt.hash(registerUserDto.password, saltRounds);

        const user = await this.userService.createUser(
            {...registerUserDto, 
                password: hash
            }
        );

        const payload = { sub: user._id };

        const token = await this.jwtService.signAsync(payload);

        console.log(token);

        return {msg: 'sign in successful', acessToken: token}
    }

    async loginUser(loginUserDto: LoginUserDto) {

        const user = await this.userService.findUserByEmail(loginUserDto.email);

        console.log(loginUserDto)
 
        if (!user) {
            throw new UnauthorizedException('Invalid Credentials')            
        }

        const match = await bcrypt.compare(loginUserDto.password, user.password);

        if(!match) {
            throw new UnauthorizedException('Invalid Credentials')
        }

        const payload = { sub: user._id };

        const token = await this.jwtService.signAsync(payload);

        console.log(token);

        return {msg: 'login successful', acessToken: token}
        
    }
}
