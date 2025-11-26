import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {MoviesModule} from "./movies/movies.module";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.POSTGRES_HOST || 'localhost',
        port: Number(process.env.POSTGRES_PORT) || 5432,
        username: process.env.POSTGRES_USER || '',
        password: process.env.POSTGRES_PASS || '',
        database: process.env.POSTGRES_DB || 'fullstack_project_db',
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),

    MoviesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
