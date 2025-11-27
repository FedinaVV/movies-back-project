import {IsEmail, Min, MinLength} from "class-validator";

export class CreateUserDto {
    @IsEmail()
    email: string;

    password: string;
}