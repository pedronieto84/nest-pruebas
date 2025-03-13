import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService,   
        private readonly jwtService: JwtService ) { }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post('logout')
    async logout() {
        return this.authService.logout();
    }

    @Post('signin')
    async signIn(@Body() signInDto: SigninDto) {
      const user = await this.authService.signin(signInDto);
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
  
      // Generate a JWT token
      const payload = { email: user.email, sub: user.userId };
      const token = this.jwtService.sign(payload);
  
      return { token };
    }
}
