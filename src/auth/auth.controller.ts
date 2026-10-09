import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterUserDto } from './dto/registerUser.dto.js';
import { LoginUserDto } from './dto/loginUser.dto.js';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register (@Body() registerUserDto: RegisterUserDto) {
        const response = await this.authService.registerUser(registerUserDto);
        return response;
    }

    @Post('login')
    async login (@Body() loginUserDto: LoginUserDto) {
        const response = await this.authService.loginUser(loginUserDto);
        return response;
    }

}
