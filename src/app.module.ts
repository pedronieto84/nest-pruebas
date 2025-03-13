import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentsModule } from './endpoints/departments/departments.module';
import { UsersModule } from './endpoints/users/users.module';
import { ProjectsModule } from './endpoints/projects/projects.module';
import { CompaniesModule } from './endpoints/companies/companies.module';
import { RecordsModule } from './endpoints/records/records.module';
import { AuthModule } from './endpoints/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
    }),
    JwtModule.register({
      secret: 'elColapsoDeOccidente', // Replace with your secret key
      signOptions: { expiresIn: '1h' },
    }),
    DepartmentsModule,
    UsersModule,
    ProjectsModule,
    CompaniesModule,
    RecordsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    AppService,
  ],
})
export class AppModule {}
