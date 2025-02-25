import { PrismaClient } from "@prisma/client";
import { getCompanies, getDepartments, getNames, getSurnames, getProjects } from "./data";
import { generateUUID } from './../src/helpers/helpers';


const prisma = new PrismaClient();


const configObject = {
    companies: 2,
    workers: 5,
    departments: 2,
    projects: 2
}

async function main() {
    await prisma.company.createMany({
        data: getCompanies(configObject.companies).map((company) => ({
            compId: generateUUID(),
            name: company
        })),
        skipDuplicates: true
    });

    // Cojo las ids de las comp created
    const createdCompaniesId = (await prisma.company.findMany({
        where: {
            name: {
                in: getCompanies(configObject.companies)
            }
        },
        select: {
            compId: true
        }
    })).map(company => company.compId);

    // Tengo que crear proyectos de cada compañías
    for (const companyId of createdCompaniesId) {
        await prisma.project.createMany({
            data: getProjects(configObject.projects).map((project) => ({
                projId: generateUUID(),
                name: project,
                compId: companyId
            })),
        });
    }

     // Tengo que crear departamentos de cada compañía
     for (const companyId of createdCompaniesId) {
        await prisma.department.createMany({
            data: getDepartments(configObject.departments).map((department) => ({
                deptId: generateUUID(),
                name: department,
                compId: companyId
            })),
        });
    }
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

