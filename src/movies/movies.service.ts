import {Injectable, NotFoundException} from '@nestjs/common';
import {createConnection, ILike, Like, Raw, Repository} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {Movie} from "./movies.entity";
import { MoviesModels } from "./movies.models";

@Injectable()
export class MoviesService {
    constructor(
        @InjectRepository(Movie)
        private moviesRepository: Repository<Movie>,
    ) {}

    async findAll(): Promise<Movie[]> {
        return this.moviesRepository.find();
    }

    async create(movie: MoviesModels): Promise<Movie> {
        return this.moviesRepository.save(movie);
    }

    async remove(id: number): Promise<void> {
        await this.moviesRepository.delete(id);
    }

    async findMovieById(id: number) {
        try {
            const result = await this.moviesRepository.query('SELECT * FROM movies WHERE id = $1', [id]);
            return result[0];
        } catch (err) {
            console.error(err.message);
        }
    }

    async findMovieByName(name: string) {
        const results = await this.moviesRepository.find({
            where: { name: ILike(`%${name}%`) },
        });
        return results;
    }

    async update(id: number, updates: Partial<Movie>): Promise<void> {
        await this.moviesRepository.update(id, updates);
    }


}