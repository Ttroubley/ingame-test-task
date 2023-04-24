import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GenreDto } from './dto/genre.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GenreEntity } from './entity/genre.entity';
import { Repository } from 'typeorm';
import { toGenreDto } from 'src/utils/utils';
import { CreateGenreDto } from './dto/create-genre.dto';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(GenreEntity)
    private readonly genreRepository: Repository<GenreEntity>,
  ) {}

  async getAllGenres(): Promise<GenreDto[]> {
    const genres = await this.genreRepository.find();
    return genres.map((genre) => toGenreDto(genre));
  }

  async getGenre(id: string): Promise<GenreDto> {
    const genre: GenreEntity = await this.genreRepository.findOne({
      where: { id },
    });
    if (!genre) {
      throw new HttpException('Genre not found', HttpStatus.BAD_REQUEST);
    }
    return toGenreDto(genre);
  }

  async addGenre(createGenreDto: CreateGenreDto): Promise<GenreDto> {
    const { name } = createGenreDto;
    const genre = await this.genreRepository.findOne({ where: { name } });
    if (genre) {
      throw new HttpException('Genre already exists', HttpStatus.BAD_REQUEST);
    }
    const newGenre: GenreEntity = this.genreRepository.create({
      name,
    });
    await this.genreRepository.save(newGenre);
    return toGenreDto(genre);
  }
}
