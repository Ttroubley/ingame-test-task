import { Controller, Get } from '@nestjs/common';
import { GenresService } from './genres.service';
import { GenreDto } from './dto/genre.dto';

@Controller('api/genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get()
  async getAll(): Promise<GenreDto[]> {
    return await this.genresService.getAllGenres();
  }
}
