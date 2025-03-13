import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FirebaseAuthService } from './firebase-auth.service';
import { FirebaseAuthMiddleware } from './firebase-auth.middleware';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Reflector } from '@nestjs/core';

@Module({
    imports: [
        JwtModule.register({
        secret: 'elColapsoDeOccidente', // Replace with your secret key
        signOptions: { expiresIn: '1h' },
    }),],
    controllers: [AuthController],
    providers: [AuthService, FirebaseAuthService, JwtService, UsersService, PrismaService, JwtAuthGuard, Reflector],
    exports: [FirebaseAuthService],
})
export class AuthModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(FirebaseAuthMiddleware)
            .forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
