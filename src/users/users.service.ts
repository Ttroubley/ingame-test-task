import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { toUserDto, hashPassword } from 'src/utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;

    const userExists = await this.usersRepository.findOne({
      where: { username },
    });

    if (userExists) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const hashedPassword = await hashPassword(password);
    const user: UserEntity = this.usersRepository.create({
      username,
      password: hashedPassword,
    });

    await this.usersRepository.save(user);

    return toUserDto(user);
  }

  async findByUsername(username: string) {
    return await this.usersRepository.findOne({ where: { username } });
  }
}
