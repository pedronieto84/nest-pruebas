import { PrismaClient, Role, ProjectRole, Relation } from "@prisma/client";
import { getCompanies, getDepartments, getNames, getSurnames, getProjects } from "./data";

import { auth, createFirebaseUser } from './../src/firebase/firebaseAuth';
import { generateRandomDates, getRandomNumber, shiftArrayGenerator } from "./helpers.seed";
import * as moment from 'moment';

const prisma = new PrismaClient();

const configObject = {
    companies: 2,
    workers: 5,
    departments: 2,
    projects: 2,
    daysWorked: 20,
    recordsPerDay: 40,
    maximumShifts: 4

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
        const usersData = await Promise.all(
            getNames(configObject.workers).map(async (name, index) => {
                const firebaseUser = await createFirebaseUser(`${name.toLowerCase()}-${index}@${comp.name}.com`);
                return {
                    firebaseId: firebaseUser.uid,
                    name: `${name} ${getSurnames(configObject.workers)[index]}`,
                    compId: comp.compId,
                    email: `${name.toLowerCase()}-${index}@${comp.name}.com`,
                    role: index === 0 ? Role.OWNER : Role.WORKER, // First user is OWNER, rest are WORKER
                    deptId: departmentsOfThisComp[Math.floor(Math.random() * departmentsOfThisComp.length)].deptId
                };
            })
        );

        await prisma.user.createMany({
            data: usersData,
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
            if (index > 0) {
                await prisma.user_Relations.create({
                    data: {
                        bossId: worker.userId,
                        subordinatedId: workersOfThisComp[index - 1].userId,
                        relation: index % 2 === 0 ? Relation.EDIT : Relation.VIEW
                    }
                });
            }

            if (index < workersOfThisComp.length - 1) {
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
    const adminFirebase = await createFirebaseUser(`pedro@admin.com`);
    await prisma.user.create({
        data: {
            firebaseId: adminFirebase.uid,
            name: "Admin",
            email: `pedro@admin.com`,
            role: Role.ADMIN
        }
    });

    // Tengo que crear los records

    // Necesito generar un array con el formato "projId" - "userId"
    const combinations = await prisma.user_Projects.findMany()

    // Generar Array de Días
    const dates = generateRandomDates(configObject.daysWorked);
    console.log(dates);

    combinations.forEach(async (combination, combinationIndex) => {

        // Aqui estoy dentro de una combinacion projId - userId
        for (const date of dates) {
            // Aqui estoy iterando en las fechas "dd-mm-yyyy"
            // Dentro de un dia /projecto/usuario tengo que volver a iterar para insertar entre 10 y 40 registros
            const numberOfShifts = getRandomNumber(1, configObject.maximumShifts)
            const numberOfRecords = getRandomNumber(10, configObject.recordsPerDay);

            // Crear un array de números incrementales con numberOfRecords y con subdivisiones en función del número de shifts
            // Por ejemplo, si tengo [[1,2,3,4], [5,6,7,8], [9,10,11,12]] y numberOfShifts = 3
            // Entonces, cada subarray corresponderá a un shift
            const recordsPerShift = Math.round(numberOfRecords / numberOfShifts)

            const arrayOfShiftsRecords = shiftArrayGenerator(numberOfShifts, Array.from({ length: numberOfRecords }, (_, i) => i + 1))


            for (const shift of arrayOfShiftsRecords) {
                // Aqui estoy dentro de un shift
                let firstStart = moment(date, 'DD-MM-YYYY').set({ hour: getRandomNumber(8,10), minute: getRandomNumber(1,60) }).toDate();
                let secondsTracked = 0
                for (const [recordIndex, record] of shift.entries()) {
                    // cada record, debo saber si es el primero o el ultimo
                    let start = false;
                    let end = false;
                    if (recordIndex === 0) start = true
                    if (recordIndex === shift.length - 1) end = true  // todavia no pongo aqui el stop
                    const startDate = moment(date, 'DD-MM-YYYY').toDate();
                    const endDate = moment(date, 'DD-MM-YYYY').toDate();
                    const objectToInsert = {
                        userId: combination.userId,
                        projId: combination.projId,
                        start: startDate,
                        end: endDate,
                        keyboard: start ? 0 : getRandomNumber(100, 1000),
                        mouseMove: start ? 0 : getRandomNumber(100, 10000),
                        mouseClicks: start ? 0 : getRandomNumber(100, 3000),
                        seconds: start ? 0 : getRandomNumber(0, 800),
                        existe: Math.random() > 0.05 ? true : false
                    }

                    secondsTracked += objectToInsert.seconds;

                    await prisma.records.create({
                        data: objectToInsert
                    });
                    // Si es el final reseteo el secondsTracked
                    if (end) {
                        secondsTracked = 0

                    }
                }
            }


         
        
        }
    })

}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

