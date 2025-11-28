import {BadRequestException, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "./users.entity";
import {CreateUserDto} from "./dto/create-user.dto";
import * as argon2 from "argon2";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private jwtService: JwtService
    ) {
    }

    async create(user: CreateUserDto): Promise<User> {
        const existUser = await this.userRepository.findOne({
            where: {
                email: user.email
            }
        });
        if (existUser) throw new BadRequestException('This email already exist');
        const newUser = await this.userRepository.save({
            email: user.email,
            password: await argon2.hash(user.password)
        });

        const token = this.jwtService.sign({email: user.email});
        //@ts-ignore
        return {newUser, token};
    }

    async findOne(email: string) {
        return await this.userRepository.findOne({where: {
            email: email
        }})
    }
}