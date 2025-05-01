import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { User } from 'src/interfaces/user.interface';
import { SignUpDto } from './dto/signup.dto';
import { UsersService } from './users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService: JwtService) {
    }

    async validateUser(signInDto: LoginDto) {
        const {email, password} = signInDto;
        const user = await this.userService.findOne(email);
        if (user && await argon.verify(user.password, password) ) {
            const {password, ...result} = user;
            return result;
        }
        return null;
    }

    login(user: User) {
        const token = this.jwtService.sign({sub: user.id, email: user.email});
        return {access_token: token};
    }

    signUp(signUpDto: SignUpDto) {
        return this.userService.create(signUpDto);
    }

    async getUser(email: string) {
        return this.userService.findOne(email);
    }
    
}
