import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FirebaseAuthService } from './firebase-auth.service';
import { FirebaseAuthMiddleware } from './firebase-auth.middleware';

@Module({
    controllers: [AuthController],
    providers: [AuthService, FirebaseAuthService],
    exports: [FirebaseAuthService],
})
export class AuthModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(FirebaseAuthMiddleware)
            .forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
