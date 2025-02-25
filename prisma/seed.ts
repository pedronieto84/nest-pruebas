import { PrismaClient } from "@prisma/client";
import { companies, departments, names, surnames, projects } from "./data";
import { generateUUID } from './../src/helpers/helpers'; 

const prisma = new PrismaClient();

async function main() {
    const compRecords = await prisma.company.createMany({
        data: companies.map((company) => ({
            compId: generateUUID(),
            name: company
        })),
    })

    

}


main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
 
    