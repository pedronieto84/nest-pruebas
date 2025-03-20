import { IsString, IsEmail, IsEnum, IsOptional, ValidateIf, Min, Max, IsInt, Length, IsNotEmpty, IsNumber } from 'class-validator';
import { Role } from '@prisma/client';

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    @Length(4, 20)
    name: string;

    @IsString()
    @Length(4, 10)
    password:string


    @IsEnum(Role)
    role: Role = Role.WORKER;

    @IsOptional()
    @IsString()
    @Length(17, 30)
    firebaseId?: string;

    @ValidateIf(o => o.role === Role.WORKER)
    @IsInt() // Asegura que sea un número entero
    @Min(1) // No puede ser negativo
    @Max(200000) 
    compId: number;

    
    @ValidateIf(o => o.role === Role.WORKER)
    @IsOptional()
    @IsInt() // Asegura que sea un número entero
    @Min(1) // No puede ser negativo
    @Max(200000) 
    deptId?: number;

    @ValidateIf(o => o.role === Role.WORKER)
    @IsOptional()
    @IsInt() // Asegura que sea un número entero
    @Min(1) // No puede ser negativo
    @Max(200000) 
    projId?: number;
}
