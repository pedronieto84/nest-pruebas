import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { Role, Prisma } from '@prisma/client'; // Import Prisma
import { generateUUID } from '../../helpers/helpers'; // Updated import path

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async createWorker(createUserDto: CreateUserDto) {
    // Verificar si el departamento existe

    const objectToCreate = {
      email: createUserDto.email,
      name: createUserDto.name,
      role: createUserDto.role as Role,
      userId: generateUUID(),
    }
    return await this.prisma.user.create({
      data: objectToCreate
    });

  }

  async createOwner(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    const userId = generateUUID(); // Aqui tendre que hacer el Firebase auth
    const departmentId = generateUUID();
    const projectId = generateUUID();

    const userToCreate = {
      email: createUserDto.email,
      name: createUserDto.name,
      role: createUserDto.role as Role,
      compId: userId,
      userId: userId,
    };

    const companyToCreate = {
      name: createUserDto.name,
      compId: userId,
    };

    const departmentToCreate = {
      name: createUserDto.name,
      deptId: departmentId,
      compId: userId,
    };

    const departmentManagerToCreate = {
      deptId: departmentId,
      userId: userId,
    };

    const projectToCreate = {
      name: createUserDto.name,
      projId: projectId,
      compId: userId,
    };

    return await this.prisma.$transaction(async (prisma: Prisma.TransactionClient) => {
      const user = await prisma.user.create({
        data: userToCreate,
      });

      const company = await prisma.company.create({
        data: companyToCreate,
      });

      const department = await prisma.department.create({
        data: departmentToCreate,
      });

      const departmentManager = await prisma.departmen_Manager.create({
        data: departmentManagerToCreate,
      });

      const project = await prisma.project.create({
        data: projectToCreate,
      });

      return { user, company, department, departmentManager, project };
    });
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
