import { IsString, IsEmail, IsEnum, IsOptional, ValidateIf } from 'class-validator';
import { Role } from '@prisma/client';

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    name: string;

    @IsEnum(Role)
    role: Role;

    @ValidateIf(o => o.role === Role.WORKER)
    @IsString()
    compId: string;

    @ValidateIf(o => o.role === Role.WORKER)
    @IsString()
    deptId: string;

    @ValidateIf(o => o.role === Role.WORKER)
    @IsString()
    projId: string;
}
