import { Injectable } from '@nestjs/common';
import { SigninDto } from './dto/signin.dto';
import { LoginDto } from './dto/login.dto';
import {createFirebaseUser } from '../../firebase/firebaseAuth'

@Injectable()
export class AuthService {
    async login(loginDto: LoginDto): Promise<any> {
        const { email, password } = loginDto;
        try {
            
            return { message: 'Login successful'};
        } catch (error) {
            throw new Error('Login failed');
        }
    }

    async logout(): Promise<void> {
        // Invalidate user session or JWT token

        // Firebase handles token invalidation automatically
    }

    async signin(signinDto: SigninDto): Promise<any> {
        const { name, password, email } = signinDto;
        try {
            const userRecord = await createFirebaseUser(email, password);
            return { message: 'Signin successful', userId: userRecord.uid };
        } catch (error) {
            throw new Error('Signin failed');
        }
    }
}
