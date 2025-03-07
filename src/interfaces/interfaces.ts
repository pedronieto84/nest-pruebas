export interface User {
    userId: number;
    firebaseId: string;
    name: string;
    email: string;
    role: Role;
    compId?: number;
    company?: Company;
    projects: Project[];
    department?: Department;
    deptId?: number;
    departmen_Manager: Department_Manager[];
    user_Projects: User_Projects[];
    boss_relations: User_Relations[];
    worker_relations: User_Relations[];
    Records: Records[];
}

export interface Company {
    compId: number;
    name: string;
    projects: Project[];
    departments: Department[];
    users: User[];
}

export interface Project {
    projId: number;
    name: string;
    compId: number;
    settings?: string;
    company: Company;
    users: User[];
    user_Projects: User_Projects[];
    Records: Records[];
}

export interface Department {
    deptId: number;
    name: string;
    compId: number;
    company: Company;
    users: User[];
    managers: Department_Manager[];
}

export interface Department_Manager {
    deptId: number;
    userId: number;
    department: Department;
    user: User;
}

export interface User_Projects {
    userId: number;
    projId: number;
    role: ProjectRole;
    user: User;
    project: Project;
}

export interface User_Relations {
    bossId: number;
    subordinatedId: number;
    relation: Relation;
    boss: User;
    subordinated: User;
}

export interface Records {
    recordId: number;
    userId: number;
    projId: number;
    start: Date;
    end: Date;
    seconds: number;
    position: RecordPosition;
    day: string;
    time: string;
    visible: boolean;
    type: RecordType;
    user: User;
    project: Project;
    RecordsDesktop: RecordsDesktop[];
    RecordsMovile: RecordsMobile[];
}

export interface RecordsDesktop {
    recordId: number;
    keyboard?: number;
    mouseMove?: number;
    mouseClicks?: number;
    image?: string;
    record: Records;
    RecordsPrograms: RecordsPrograms[];
}

export interface RecordsPrograms {
    recordProgrId?: number;
    recordId?: number;
    time: Date;
    title: string;
    keyboard?: number;
    mouseMove?: number;
    mouseClicks?: number;
    record: RecordsDesktop;
}

export interface RecordsMobile {
    recordId: number;
    record: Records;
    geoPosition: string;
    video?: string;
    foto?: string;
}

export interface WorkerSettings {
    wakeUp?: boolean;
    stopLockScreen?: boolean;
    stopOnSuspend?: boolean;
    stopOnLockScreen?: boolean;
    hidden?: boolean;
    
    processes?: boolean;
    systemData?: boolean;
    ipLocation?: boolean;
    internetSpeed?: boolean;
    alwaysAwake?: boolean;
    conexion?: boolean;
    shutdown?: boolean;

    screenshotView?: boolean;
    activityView?: boolean;
    processesView?: boolean;
    systemDataView?: boolean;

    resetComment?: boolean;
    gpsView?: boolean;
    callsView?: boolean;
    stopOnInactive?: boolean;
    
    screenshot?: boolean;
    activity?: boolean;
   
    calls?: boolean;
    gps?: boolean;
    recordsPhone?: number;
    gpsPrecision?: number;
    recWithoutMov?: boolean;
    forceAwake?: boolean;
    awakeEvery?: number;
    gpsTime?: number;
    menuConexion?: boolean;
    menuPanel?: boolean;
    menuGraficos?: boolean;
    menuHorarios?: boolean;
    menuSemanal?: boolean;
    menuEquipo?: boolean;
    menuProyectos?: boolean;
    menuOficina?: boolean;
    menuInformes?: boolean;
    menuPartner?: boolean;
}

export interface WorkerSettingsExtended extends WorkerSettings {

}

export interface ProjectSettings {
    // Define properties as needed
}

export enum Role {
    ADMIN = 'ADMIN',
    WORKER = 'WORKER',
    OWNER = 'OWNER',
}

export enum ProjectRole {
    BOSS = 'BOSS',
    WORKER = 'WORKER',
}

export enum Relation {
    VIEW = 'VIEW',
    EDIT = 'EDIT',
}

export enum RecordPosition {
    START = 'START',
    END = 'END',
    MIDDLE = 'MIDDLE',
}

export enum RecordType {
    DESKTOP = 'DESKTOP',
    MOBILE = 'MOBILE',
}


/*

User WorkerSettings y ProjectSettings de Worktocloud Antiguo.



export interface User {

    active: boolean
    created?: string
    displayName: string
    email: string
    oldOnwerId: string[]
    ownerId: string[]
    projects?: []
    type: number []
    verified: boolean
    watching?: {
        cuota: number;
        displayName: string;
        frequency: number;
        size: {
            height: number
            width: number
        }
    }
    workerId: string;
    worktocloudValue?: number,
    workerSettings: WorkerSettings
    /*
    oldUserRef:{
        idPerfilGeneral: string
        idManager: string;

    } 

    export interface   WorkerSettings {
              wakeUp: boolean;
              stopLockScreen: boolean;
              stopOnSuspend: boolean;
              timezone: string; 
              stopOnLockScreen: boolean;
              secondsRecord: number ;
              hidden: boolean;
              s3Bucket: boolean;
              s3BucketParams: {
                  region: string;
                  secretAccessKey: string;
                  accessKeyId: string;
                  bucketName: string;
              },
              getVideo: boolean,
              maxSecondsVideo: number ,
              showVideo: boolean,
              webcam: boolean,
              micro: boolean,
              checkRisk: boolean,
              arrayOfRiskyPrograms: string [],
              arrayOfAllowedPrograms: string [] ,
              arrayOfForbiddenPrograms: string [] ,
              intervalFrequency: number ,
              gamification: boolean,
              typeOfWork: boolean,
              fiscalIdentifier: string;
              workerStats: boolean,
              processes: boolean, 
              systemData: boolean,
              ipLocation: boolean,
              internetSpeed: boolean,
              alwaysAwake: boolean,
              inactivitySetting: 'none' | 'insomnia' | 'sumar' | 'noSumar',
              scheduleObject: ScheduleObject,
              scheduleOptionChosen: 'calendar' | 'maxWorkedTime' | 'console',
              nitidez: 'low' | 'medium' | 'high',
              allowControlFromBackend: boolean ,
              conexion: boolean ,
              enableExtraHours: boolean,
              shutdown: boolean,
              screenshotView: boolean,
              activityView: boolean,
              processesView: boolean,
              systemDataView: boolean,
              resetComment: boolean,
              gpsView: boolean,
              callsView: boolean,
              sueldo: number,
              salaryType: 'hora' | 'mes' | 'semana' ,
              maxWorkingTime: number,
              weekExtraHour: WeekExtrahourObject,
              autoChange: 'never' | 'default' | 'previous',
              registrysInactive: number,
              restartOnActive: boolean,
              scheduleType: 'rigid' | 'flexible' | 'info' ,
              updateFromBackend: 'client' | 'auto',
              stopOnInactive: boolean ,
              manager: boolean,
              managerType: 'forbidden' | 'worker' | 'ver' | 'editar',
              screenshot: boolean,
              activity: boolean ,
              workersManaged : WorkerMiniInfo[],
              defaultProjectId: string | null,
              workerId: string,
              calls: boolean,
              gps: boolean,
              recordsPhone: number,
              gpsPrecision: number,
              recWithoutMov: boolean,
              forceAwake: boolean,
              awakeEvery: number,
              gpsTime: number,
              
              menuConexion: boolean,
              menuPanel : boolean,       
               menuGraficos :boolean,
              menuHorarios : boolean,
              menuSemanal :boolean,
              menuEquipo : boolean,       
                menuProyectos : boolean,
              menuOficina :boolean,
              menuInformes :boolean,
              menuPartner :boolean,
              
              
              push: boolean,
              sex: 'man' | 'woman',
              dateOfBirth: string | any,
              isLaptop: boolean,
              laptopSecondsOff: number,
              sensitivityFilter: number,
              filterRegisters: boolean,
              whatToDoWithInactive: 'notCount' | 'totalBlock'
    
    
            }
    
    

*/