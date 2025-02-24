import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { Role } from '@prisma/client';
import { generateUUID } from 'src/helpers/helpers';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    // Verificar si el departamento existe

    const objectToCreate = {
      email: createUserDto.email,
      name: createUserDto.name,
      role: createUserDto.role as Role,
      userId: generateUUID() ,
    }
    return await this.prisma.user.create({
      data: objectToCreate});
   
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
