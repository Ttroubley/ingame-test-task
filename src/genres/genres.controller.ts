import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { GenresService } from './genres.service';
import { GenreDto } from './dto/genre.dto';
import { CreateGenreDto } from './dto/create-genre.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles-guard/roles.decorator';
import { Role } from 'src/auth/roles-guard/roles.enum';

@Controller('api/genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get()
  async getAll(): Promise<GenreDto[]> {
    return await this.genresService.getAllGenres();
  }

  @RolesGuard(Role.Admin)
  @UseGuards(JwtAuthGuard)
  @Post()
  async addGenre(@Body() createGenreDto: CreateGenreDto) {
    return await this.genresService.addGenre(createGenreDto);
  }
}
