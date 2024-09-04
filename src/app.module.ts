import 'reflect-metadata';

import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth/auth.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as process from 'node:process';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import entities from './utils/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    PassportModule.register({ session: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_DB_HOST,
      port: parseInt(process.env.MYSQL_DB_PORT),
      username: process.env.MYSQL_DB_USERNAME,
      password: process.env.MYSQL_DB_PASSWORD,
      database: process.env.MYSQL_DB_NAME,
      entities,
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [AppService, UsersService],
})
export class AppModule {}
