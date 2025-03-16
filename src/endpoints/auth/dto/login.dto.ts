import { IsEmail, IsString, Length } from 'class-validator';

export class LoginAuthDto {
    @IsEmail()
    email: string;

    @IsString()
    @Length(4, 20)
    password: string;

 
}
