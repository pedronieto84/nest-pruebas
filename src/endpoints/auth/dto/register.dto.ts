import { PartialType } from '@nestjs/mapped-types';
import { LoginAuthDto } from './login.dto';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class RegisterAuthDto extends PartialType(LoginAuthDto) {
    @IsString()
    @IsNotEmpty()
    name: string;
}
