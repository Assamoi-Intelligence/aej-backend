import { Body, ConflictException, Controller, Get, HttpCode, HttpStatus, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { AuthGuard } from './auth.guard';
import { User } from 'src/interfaces/user.interface';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signin(@Body() signInDto: LoginDto) {
        const user = await this.authService.validateUser(signInDto);
        if (!user) throw new UnauthorizedException('Identifiants incorrectes');
        return this.authService.login({...user, password: ''});
    }
    
    @HttpCode(HttpStatus.OK)
    @Post('signup')
    async signup(@Body() signUpDto: SignUpDto) {
        const user = await this.authService.getUser(signUpDto.email);
        if (user) throw new ConflictException('Utilisateur existe déjà');
        const newUser = await this.authService.signUp(signUpDto);
        return this.authService.login(<User>{email: newUser.email, id: newUser.id});
    }

    @UseGuards(AuthGuard)
    @Get('me')
    get(@Request() req) {
        return req.user;
    }
}
