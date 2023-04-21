import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorEntity } from './entity/author.entity';
import { Repository } from 'typeorm';
import { CreateAuthorDto } from './dto/create-author.dto';
import { AuthorDto } from './dto/author.dto';
import { toAuthorDto } from 'src/utils';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(AuthorEntity)
    private readonly authorRepository: Repository<AuthorEntity>,
  ) {}

  async createAuthor(createAuthorDto: CreateAuthorDto): Promise<AuthorDto> {
    const { fullName, birthdate } = createAuthorDto;
    const author: AuthorEntity = this.authorRepository.create({
      fullName,
      birthdate,
    });
    await this.authorRepository.save(author);
    return toAuthorDto(author);
  }

  async getAllAuthors() {
    const authors: AuthorEntity[] = await this.authorRepository.find();
    return authors.map((author) => toAuthorDto(author));
  }

  async getAuthor(id: number) {
    const author: AuthorEntity = await this.authorRepository.findOne({
      where: { id },
    });
    if (!author) {
      throw new HttpException('Author not found', HttpStatus.BAD_REQUEST);
    }
    return toAuthorDto(author);
  }

  async deleteAuthor(id: number) {
    const author: AuthorEntity = await this.authorRepository.findOne({
      where: { id },
    });
    if (!author) {
      throw new HttpException('Author doesnt exists', HttpStatus.BAD_REQUEST);
    }
    await this.authorRepository.delete({ id });
    return toAuthorDto(author);
  }
}
