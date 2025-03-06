export const companies: string[] = [
    "Santander",
    "BBVA",
    "Iberdrola",
    "Inditex",
    "Repsol",
    "Telefonica",
    "Endesa",
    "CaixaBank",
    "Aena",
    "Ferrovial"
];

export const names: string[] = [
    // Españoles
    "Alejandro", "Maria", "Carlos", "Lucia", "Javier", "Ana", "David", "Sofia", "Daniel", "Laura",
    "Miguel", "Paula", "Sergio", "Elena", "Hugo",
    // Anglosajones
    "William", "Emily", "John", "Olivia", "James",
    // Alemanes
    "Hans", "Heidi", "Fritz", "Greta", "Wolfgang",
    // Rusos
    "Ivan", "Anastasia", "Dmitri", "Tatiana", "Nikolai",
    // Chinos
    "Wei", "Xiao", "Li", "Mei", "Chen",
    // Italianos
    "Giovanni", "Francesca", "Luca", "Chiara", "Alessandro"
];

export const surnames = [
    // Españoles
    "Garcia", "Fernandez", "Gonzalez", "Rodriguez", "Lopez", "Martinez", "Sanchez", "Perez", "Gomez", "Martin",
    "Jimenez", "Ruiz", "Hernandez", "Diaz", "Moreno", "Alvarez", "Munoz", "Romero", "Alonso", "Gutierrez",
    // Anglosajones
    "Smith", "Johnson", "Brown", "Taylor", "Anderson",
    // Alemanes
    "Schmidt", "Muller", "Weber", "Schneider", "Fischer",
    // Rusos
    "Ivanov", "Petrov", "Sokolov", "Volkov", "Kuznetsov",
    // Chinos
    "Wang", "Zhang", "Li", "Liu", "Huang",
    // Italianos
    "Rossi", "Ferrari", "Bianchi", "Romano", "Conti"
];

export const departments: string[] = [
    "Marketing Estrategico",
    "Contabilidad y Finanzas",
    "Innovacion y Desarrollo",
    "Relaciones Publicas",
    "Logistica y Distribucion",
    "Atencion al Cliente",
    "Desarrollo de Software",
    "Recursos Humanos",
    "Investigacion de Mercado",
    "Operaciones y Produccion"
];

export const projects: string[] = [
    "Expansion Digital",
    "Optimizacion Financiera",
    "Nueva App Movil",
    "Sostenibilidad Empresarial",
    "Automatizacion de Logistica",
    "Campana Publicitaria Global",
    "Plataforma de E-learning",
    "Analisis de Tendencias de Mercado",
    "Mejoras en la Atencion al Cliente",
    "Seguridad Cibernetica Avanzada"
];

export const arrayOfPrograms: string[] = [
    "Microsoft Excell: Nivel Avanzado",
    "Microsoft Word: Files clients 3",
    "Google Chrome: Wikipedia"
    
]

export const getCompanies = (amount: number = 5): string[] => {
    return companies.slice(0, amount);
};

export const getNames = (amount: number = 5): string[] => {
    return names.slice(0, amount);
};

export const getSurnames = (amount: number = 5): string[] => {
    return surnames.slice(0, amount);
};

export const getDepartments = (amount: number = 5): string[] => {
    return departments.slice(0, amount);
};

export const getProjects = (amount: number = 5): string[] => {
    return projects.slice(0, amount);
};

export const getPrograms = (amount: number = 3): string[] => {
    return arrayOfPrograms.slice(0, amount);
}

