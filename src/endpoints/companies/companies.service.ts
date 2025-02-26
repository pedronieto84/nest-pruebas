import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) { }

  create(createCompanyDto: CreateCompanyDto) {
    const { compId, name } = createCompanyDto;

    const data: any = { name };

    if (compId) {
      data.compId = compId;
    }

    return this.prisma.company.create({
      data,
    });
  }

  findAll() {
    return this.prisma.company.findMany();
  }

  findOne(id: string) {
    return this.prisma.company.findUnique({
      where: { compId: +id }
    });
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
