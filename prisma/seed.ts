import { PrismaClient, Role, ProjectRole, Relation } from "@prisma/client";
import { getCompanies, getDepartments, getNames, getSurnames, getProjects } from "./data";
import { generateUUID } from './../src/helpers/helpers';


const prisma = new PrismaClient();


const configObject = {
    companies: 2,
    workers: 5,
    departments: 2,
    projects: 2
}

const roles: Role[] = [Role.ADMIN, Role.WORKER, Role.OWNER]; // Ensure roles match the Enum values
const projectRoles: ProjectRole[] = [ProjectRole.BOSS, ProjectRole.WORKER]; // Ensure roles match the Enum values
async function main() {
    await prisma.company.createMany({
        data: getCompanies(configObject.companies).map((company) => ({
            name: company
        })),
        
    });

    // Cojo las ids de las comp created
    const createdCompanies = await prisma.company.findMany({
        where: {
            name: {
                in: getCompanies(configObject.companies)
            }
        }

    })

    // Tengo que crear proyectos de cada compañías
    for (const comp of createdCompanies) {
        await prisma.project.createMany({
            data: getProjects(configObject.projects).map((project) => ({
                name: project,
                compId: comp.compId
            })),
        });
    }

    // Tengo que crear departamentos de cada compañía
    for (const comp of createdCompanies) {
        await prisma.department.createMany({
            data: getDepartments(configObject.departments).map((department) => ({
                
                name: department,
                compId: comp.compId
            })),
        });
    }

    // Tengo que crear los empleados de cada compañía	
    for (const comp of createdCompanies) {

        // Necesito cargar los departamentos de esta compañía
        const departmentsOfThisComp = await prisma.department.findMany({
            where: {
                compId: comp.compId
            }
        });

        // Necesito cargar los proyectos de esta compañía
        const projectsOfThisComp = await prisma.project.findMany({
            where: {
                compId: comp.compId
            }
        });

        // Creo todos los empleados de una compañía asignandoles a una compañía y departamneto aleatorio

        await prisma.user.createMany({
            data: getNames(configObject.workers).map((name, index) => ({
                firebaseId: generateUUID(),
                name: `${name} ${getSurnames(configObject.workers)[index]}`,
                compId: comp.compId,
                email: `${name.toLowerCase()}-${index}@${comp.name}.com`,
                role: index === 0 ? Role.OWNER : Role.WORKER, // First user is OWNER, rest are WORKER
                deptId: departmentsOfThisComp[Math.floor(Math.random() * departmentsOfThisComp.length)].deptId
            })),
        });

        // Asigno a cada trabajador un proyecto aleatorio
        const workersOfThisComp = await prisma.user.findMany({
            where: {
                compId: comp.compId
            }
        });

        // Global set to track assigned pairs
        const assignedPairs = new Set();

        // Iterar sobre cada workerOfThisComp y asignarle un proyecto aleatorio y gestionar un department
        for (const [index, worker] of workersOfThisComp.entries()) {
            await prisma.user_Projects.create({
                data: {
                    userId: worker.userId,
                    projId: projectsOfThisComp[Math.floor(Math.random() * projectsOfThisComp.length)].projId,
                    role: projectRoles[Math.floor(Math.random() * projectRoles.length)]
                }
            });
            // Asigno en algun trabajador, el rol de manager de departamento

            await prisma.department_Manager.create({
                data: {
                    userId: worker.userId,
                    deptId: worker.deptId
                }
            });


            // Creo las relaciones entre trabajadores
            if (index > 0 ) {
                await prisma.user_Relations.create({
                    data: {
                        bossId: worker.userId,
                        subordinatedId: workersOfThisComp[index - 1].userId,
                        relation: index % 2 === 0 ? Relation.EDIT : Relation.VIEW
                    }
                });
            }

            if(index < workersOfThisComp.length - 1) {
                await prisma.user_Relations.create({
                    data: {
                        bossId: worker.userId,
                        subordinatedId: workersOfThisComp[index + 1].userId,
                        relation: index % 2 === 0 ? Relation.EDIT : Relation.VIEW
                    }
                });
            }
        }


    }
    // Add a user with email "admin@company" and role "ADMIN" and no compId or projId or deptId
    await prisma.user.create({
        data: {
            firebaseId: generateUUID(),
            name: "Admin",
            email: `pedro@admin.com`,
            role: Role.ADMIN
        }
    });
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

