import { IsString, IsEmail, IsEnum, IsOptional } from 'class-validator';
import { Role } from '@prisma/client';

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    name: string;

    @IsEnum(Role)
    role: Role;

    @IsString()
    @IsOptional()
    compId: string

    @IsString()
    @IsOptional()
    deptId: string

    @IsString()
    @IsOptional()
    projId: string
}
