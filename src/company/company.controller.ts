import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { CompanyService } from './company.service';
import { Company } from '@prisma/client';

@Controller('companies')
export class CompanyController {

    constructor( private readonly companyService: CompanyService) { }

        @Get()
        async getAllCompanies():Promise<Company[]> {
            return this.companyService.getAllCompanies();
        }

        @Post()
        async createCompany(@Body() data: any): Promise<Company> {
            return this.companyService.createCompany(data);
        }

        @Get(':id')
        async getCompanyById(@Param('id') id:string): Promise<Company> {
            return this.companyService.getCompanyById(+id);
        }

        @Delete(':id')
        async deleteCompany(@Param('id') id:string): Promise<Company> {
            return this.companyService.deleteCompany(+id);
        }

        @Put(':id')
        async updateCompany(@Param('id') id:string, @Body() data: Company): Promise<Company> {
            return this.companyService.updateCompany(+id, data);
        }



    
}