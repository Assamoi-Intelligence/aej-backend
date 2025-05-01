import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpDto } from '../auth/dto/signup.dto';
import * as argon from 'argon2';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async findOne(email: string) {
        this.prisma
        const user = await this.prisma.user.findUnique({where: {email}});
        return user;
    }

    async create(user: SignUpDto) {
        const { password, email } = user;
        const hashedPassword = await  argon.hash(password)
        const newUser = await this.prisma.user.create({data: { email: email, password: hashedPassword }});
        return newUser;
    }
}
