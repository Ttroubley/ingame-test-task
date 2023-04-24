import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { GenresService } from './genres.service';
import { GenreDto } from './dto/genre.dto';
import { CreateGenreDto } from './dto/create-genre.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/auth/roles-guard/roles.enum';
import { RolesGuard } from '../auth/roles-guard/role.guard';
import { Roles } from 'src/auth/roles-guard/roles.decorator';
@Controller('api/genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get()
  async getAll(): Promise<GenreDto[]> {
    return await this.genresService.getAllGenres();
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async addGenre(@Body() createGenreDto: CreateGenreDto) {
    return await this.genresService.addGenre(createGenreDto);
  }
}
