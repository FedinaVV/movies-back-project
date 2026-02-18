import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'movies'})
export class Movie {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    year: string;

    @Column()
    poster: string;

    @Column()
    rating: string;

}