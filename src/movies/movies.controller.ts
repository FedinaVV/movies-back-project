import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { MoviesService } from './movies.service';
import {Movie} from "./movies.entity";
import {MoviesModels} from "./movies.models";


@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {
    }

    @Get('list')
    async findAll(): Promise<Movie[]> {
        return this.moviesService.findAll();
    }

    @Get(':id')
    async findMovieById(@Param('id') id: number):  Promise<Movie | any> {
        return this.moviesService.findMovieById(id)
        }

    @Get('search/:name')
    async findMovieByName(@Param('name') name: string):  Promise<Movie[]> {
        return this.moviesService.findMovieByName(name);
    }

    @Post('create')
    async create(@Body() createMovie: Movie) {
        return this.moviesService.create(createMovie);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.moviesService.remove(id);
    }

    @Put('update/:id')
    async update(@Param('id') id: number, @Body() updates: MoviesModels): Promise<void> {
        return this.moviesService.update(id, updates);
    }
}