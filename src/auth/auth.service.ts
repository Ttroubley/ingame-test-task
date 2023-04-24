import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { comparePassword, toUserDto } from '../utils';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { RegistrationStatus } from './interfaces/registration-status.interface';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { JwtPayload } from './interfaces/payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: 'User successfully created',
    };
    try {
      await this.usersService.createUser(createUserDto);
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }
    return status;
  }

  async login(loginUserDto: LoginUserDto) {
    const { username, password } = loginUserDto;
    const user = await this.validateUser(username, password);

    const payload: JwtPayload = {
      username: user.username,
      sub: user.id,
      roles: user.roles,
    };

    return { access_token: this.jwtService.sign(payload) };
  }

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new HttpException('User doesnt exists', HttpStatus.UNAUTHORIZED);
    }
    const comparePasswords = await comparePassword(user.password, password);

    if (!comparePasswords) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }
    return toUserDto(user);
  }
}
