import { IsString, Length } from 'class-validator';
import { LoginDto } from './login.dto';

export class SigninDto extends LoginDto {
    @Length(1, 50)
    @IsString()
    name: string;
}
