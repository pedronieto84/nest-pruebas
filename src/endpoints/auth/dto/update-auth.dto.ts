import { PartialType } from '@nestjs/mapped-types';
import { LoginDto } from './login';

export class UpdateAuthDto extends PartialType(LoginDto) { }
