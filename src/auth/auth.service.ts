import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import * as argon2 from "argon2";
import {JwtService} from "@nestjs/jwt";
import {IUser} from "../users/users.models";


@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne(email);
    if (user && user.password) {
      const passwordIsMatch = await argon2.verify(user.password, password);
      if (passwordIsMatch) {
        return user;
      }
    }
    throw new UnauthorizedException('Email or password are incorrect');
  }

  async login(user: IUser) {
    const {id, email} = user;
    return {
      id,
      email,
      token: this.jwtService.sign({id: user.id, email: user.email}),
    }
  }
}
