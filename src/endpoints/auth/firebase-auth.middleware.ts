import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { FirebaseAuthService } from './firebase-auth.service';

@Injectable()
export class FirebaseAuthMiddleware implements NestMiddleware {
    constructor(private readonly firebaseAuthService: FirebaseAuthService) { }

    async use(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization?.split('Bearer ')[1];
        if (!token) {
            throw new UnauthorizedException('Token not provided');
        }

        try {
            const decodedToken = await this.firebaseAuthService.validateToken(token);
            req['user'] = decodedToken;
            next();
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}
