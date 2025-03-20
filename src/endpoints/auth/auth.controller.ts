import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login';
import { FirebaseAuthGuard } from 'src/guards/firebase-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @HttpCode(200) // Explicitly set the status code for a successful login
  login(@Body() createAuthDto: LoginDto) {
    return this.authService.login(createAuthDto);
  }

  @UseGuards(FirebaseAuthGuard)
  @Get('protected')
  getProtectedResource() {
    return { message: 'This is a protected resource' };
  }
}
