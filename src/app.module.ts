import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentsModule } from './endpoints/departments/departments.module';
import { UsersModule } from './endpoints/users/users.module';
import { ProjectsModule } from './endpoints/projects/projects.module';
import { CompaniesModule } from './endpoints/companies/companies.module';

@Module({
  imports: [
    
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
    }),
    DepartmentsModule,
    UsersModule,
    ProjectsModule,
    CompaniesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
