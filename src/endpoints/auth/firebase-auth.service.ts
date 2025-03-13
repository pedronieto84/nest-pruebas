import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseAuthService {
    constructor() {
        admin.initializeApp({
            credential: admin.credential.applicationDefault(),
        });
    }

    async validateToken(token: string): Promise<admin.auth.DecodedIdToken> {
        try {
            return await admin.auth().verifyIdToken(token);
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}
