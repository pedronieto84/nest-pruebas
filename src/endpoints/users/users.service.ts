import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { Role, Prisma, ProjectRole, Relation } from '@prisma/client'; // Import Prisma
import { generateUUID } from '../../helpers/helpers'; // Updated import path

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async createWorker(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const userId = generateUUID();  // Firebase auth

    // Necesito saber a que projectId
    // Necesito saber a que CompanyId
    // Necesito saber a que DepartmentId

    const compId = createUserDto.compId

    if (!compId) {
      throw new HttpException('Company Id is required', HttpStatus.BAD_REQUEST);
    }



    // Load any DeptId and any ProjId

    const deptId = createUserDto.deptId ? createUserDto.deptId : (await this.prisma.department.findFirst({ where: { compId: compId } })).deptId

    const projId = createUserDto.projId ? createUserDto.projId : (await this.prisma.project.findFirst({ where: { compId: compId } })).projId

    const userToCreate = {
      email: createUserDto.email,
      name: createUserDto.name,
      role: Role.WORKER, // Ensure valid Role enum value

      userId: userId,
      deptId: deptId,
      compId: compId

    };

    return await this.prisma.$transaction(async (prisma: Prisma.TransactionClient) => {
      const user = await prisma.user.create({
        data: userToCreate,
      });

      const projectUser = await prisma.user_Projects.create({
        data: { projId, userId, role: ProjectRole.WORKER },
      });

      const userRelation = await prisma.user_Relations.create({
        data: { bossId: userId, subordinatedId: userId, relation: Relation.VIEW },
      });

      return { userId: user.userId, email: user.email, name: user.name };
    });

  }

  async createOwner(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const userId = generateUUID(); // Aqui tendre que hacer el Firebase auth
    const departmentId = generateUUID();
    const projectId = generateUUID();

    const userToCreate = {
      email: createUserDto.email,
      name: createUserDto.name,
      role: Role.OWNER, // Ensure valid Role enum value

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

    const projectUserToCreate = {
      projId: projectId,
      userId: userId,
      role: ProjectRole.BOSS,
    };

    const userRelationToCreate = {
      bossId: userId,
      subordinatedId: userId,
      relation: Relation.EDIT,
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

      const departmentManager = await prisma.department_Manager.create({
        data: departmentManagerToCreate,
      });

      const project = await prisma.project.create({
        data: projectToCreate,
      });

      const projectUser = await prisma.user_Projects.create({
        data: projectUserToCreate,
      });

      const userRelation = await prisma.user_Relations.create({
        data: userRelationToCreate,
      });

      await prisma.user.update({
        where: { userId: userId },
        data: {
          compId: userId,
          deptId: departmentId,
        },
      });

      return { userId: user.userId, email: user.email, name: user.name };
    });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { userId: id }
    })
    console.log('user', user);
    if (user) return user
    throw new HttpException("User does not exist", HttpStatus.NOT_FOUND);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    // Primero cargamos el usuario previo, para ver si existe
    const user = await this.prisma.user.findUnique({
      where: { userId: id }
    });

    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }

    // Actualizar solo los campos especificados en updateUserDto
    const updatedData: Partial<UpdateUserDto> = {};
    if (updateUserDto.email) {
      updatedData.email = updateUserDto.email;
    }
    if (updateUserDto.name) {
      updatedData.name = updateUserDto.name;
    }

    return await this.prisma.user.update({
      where: { userId: id },
      data: updatedData,
    });
  }

  async remove(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { userId: id },
      include: {
        company: true,
        department: true,
        user_Projects: true,
        departmen_Manager: true,
        boss_relations: true,
        worker_relations: true,
      },
    });

    if (!user) {
      throw new HttpException('User does not exist or is not an OWNER', HttpStatus.NOT_FOUND);
    }

    switch (user.role) {
      case Role.OWNER:
        return await this.prisma.$transaction(async (prisma: Prisma.TransactionClient) => {
          // Delete user relations
          await prisma.user_Relations.deleteMany({
            where: {
              OR: [
                { bossId: id },
                { subordinatedId: id },
              ],
            },
          });

          // Delete user projects
          await prisma.user_Projects.deleteMany({
            where: { userId: id },
          });

          // Delete department manager
          await prisma.department_Manager.deleteMany({
            where: { userId: id },
          });

          // Delete department
          if (user.department) {
            await prisma.department.delete({
              where: { deptId: user.department.deptId },
            });
          }

          // Delete company
          if (user.company) {
            await prisma.company.delete({
              where: { compId: user.company.compId },
            });
          }

          // Delete user
          await prisma.user.delete({
            where: { userId: id },
          });

          return { message: 'User and related entities deleted successfully' };
        });

      case Role.WORKER:
        return this.prisma.$transaction(async (prisma: Prisma.TransactionClient) => {
          // Delete user relations
          await prisma.user_Relations.deleteMany({
            where: {
              OR: [
                { bossId: id },
                { subordinatedId: id },
              ],
            },
          });

          // Delete user projects
          await prisma.user_Projects.deleteMany({
            where: { userId: id },
          });

          // Delete department manager
          await prisma.department_Manager.deleteMany({
            where: { userId: id },
          });


          // Delete user
          await prisma.user.delete({
            where: { userId: id },
          });

          return { message: 'User and related entities deleted successfully' };
        })

      default:
        return await this.prisma.user.delete({
          where: { userId: id },
        });
    }
  }
}
