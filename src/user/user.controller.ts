import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service.js';

@Controller('user')
export class UserController {

    constructor (private readonly userService: UserService) {}

    @Get(':id')
    async findUser(@Param('id') id: string) {
        console.log('get user request hit, searching for id:', id);
        return await this.userService.findUser(id);
    }
}
