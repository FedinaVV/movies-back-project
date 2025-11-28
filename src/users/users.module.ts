import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./users.entity";
import {UsersController} from "./users.controller";
import {UsersService} from "./users.service";
import {JwtModule} from "@nestjs/jwt";
import {jwtConst} from "../auth/const";


@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            secret: jwtConst.secret,
            signOptions: {expiresIn: '5d'}
        })
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService]
})

export class UsersModule {}