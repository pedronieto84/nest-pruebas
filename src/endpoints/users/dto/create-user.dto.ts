import { IsString, IsEmail, IsEnum, IsOptional, ValidateIf, MaxLength, MinLength, Length } from 'class-validator';
import { Role } from '@prisma/client';

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    name: string;

    @IsString()
    @Length(4, 10)
    password:string


    @IsEnum(Role)
    role: Role;

    @IsOptional()
    @IsString()
    @MaxLength(30)
    @MinLength(17)
    firebaseId?: string;

    @ValidateIf(o => o.role === Role.WORKER)
    @IsString()
    compId: number;

    @ValidateIf(o => o.role === Role.WORKER)
    @IsString()
    deptId: number;

    @ValidateIf(o => o.role === Role.WORKER)
    @IsString()
    projId: number;
}
