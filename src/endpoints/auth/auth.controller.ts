import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { FirebaseAuthGuard } from 'src/guards/firebase-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  lotin(@Body() createAuthDto: LoginDto) {
    return this.authService.login(createAuthDto);
  }

  @UseGuards(FirebaseAuthGuard)
  @Get('protected')
  getProtectedResource() {
    return { message: 'This is a protected resource' };
  }
}
