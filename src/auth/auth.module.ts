import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersService } from './users.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule, PrismaModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_PASSWORD'),
        global: true,
        signOptions: {expiresIn: '1h'}
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [AuthController,],
  providers: [AuthService, UsersService, PrismaService]
})
export class AuthModule {}
