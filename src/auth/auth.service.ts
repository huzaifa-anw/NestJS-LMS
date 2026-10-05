import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    registerUser() {
        return {msg: 'POST /auth/register route', meow: 'meow'}
    }
}
