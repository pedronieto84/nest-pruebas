import { IsOptional, IsString, IsEmail, IsNotEmpty, Length } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    @Length(4, 20)
    name?: string;
}
