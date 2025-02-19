import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Company } from "@prisma/client";

@Injectable()
export class CompanyService {
    constructor(private prisma: PrismaService) {

    }

    async getAllCompanies(): Promise<Company[]> {
        return this.prisma.company.findMany();
    }

    async getCompanyById(id: number): Promise<Company> {
        return this.prisma.company.findUnique({
            where: {
                id: id
            }
        });
    }

    async createCompany(data: any): Promise<Company> {
        return this.prisma.company.create({
             data
        });
    }

    async updateCompany(id: number, data: Company): Promise<Company> {
        return this.prisma.company.update({
            where: {
                id: id
            },
             data
        });
    }

    async deleteCompany(id: number): Promise<Company> {
        return this.prisma.company.delete({
            where: {
                id
            }
        });
    }
}