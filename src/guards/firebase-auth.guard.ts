import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { verifyFirebaseToken} from '../firebase/firebaseAuth';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split('Bearer ')[1];

        if (!token) {
            console.log('token no encontrado', request.headers);
            throw new HttpException('Authorization token not found', HttpStatus.UNAUTHORIZED);
        }

        try {
            const decodedToken = await verifyFirebaseToken(token);
            console.log('decodedToken', decodedToken);
            request.user = decodedToken; // Attach decoded token to the request object
            return true;
        } catch (error) {
            console.log('linea 20 error', error);
            throw new HttpException('Invalid or expired token', HttpStatus.UNAUTHORIZED);
        }
    }

 
}
