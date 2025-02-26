import { Injectable } from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class RecordsService {

 constructor(private prisma: PrismaService) { }

  create(createRecordDto: CreateRecordDto) {
    return 'This action adds a new record';
  }

  findAll(params: {  userId: string, day: string }) {
    const { userId, day } = params;
    // Implement the logic to handle the parameters and return the records
    // Example:
    return this.prisma.records.findMany({
      where: {  userId, day }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} record`;
  }

  update(id: number, updateRecordDto: UpdateRecordDto) {
    return `This action updates a #${id} record`;
  }

  remove(id: number) {
    return `This action removes a #${id} record`;
  }
}
