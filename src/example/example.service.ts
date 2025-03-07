import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ExampleService {
  constructor(private prisma: PrismaService) {}

  async createExample(data: { value: number }) {
    if (data.value < 0 || data.value > 10000) {
      throw new BadRequestException('Value must be between 0 and 10000');
    }
    return this.prisma.exampleModel.create({ data });
  }
}
