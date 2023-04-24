import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorDto } from './dto/author.dto';
import { CreateAuthorDto } from './dto/create-author.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles-guard/roles.decorator';
import { Role } from 'src/auth/roles-guard/roles.enum';

@Controller('api/authors')
export class AuthorsController {
  constructor(private readonly authorService: AuthorsService) {}

  @Get()
  async getAll(): Promise<AuthorDto[]> {
    return await this.authorService.getAllAuthors();
  }

  @RolesGuard(Role.Admin)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: string): Promise<AuthorDto> {
    return await this.authorService.getAuthor(id);
  }

  @RolesGuard(Role.Admin)
  @UseGuards(JwtAuthGuard)
  @Post()
  async createAuthor(
    @Body() createAuthorDto: CreateAuthorDto,
  ): Promise<AuthorDto> {
    return await this.authorService.createAuthor(createAuthorDto);
  }

  @RolesGuard(Role.Admin)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateAuthor(@Param('id') id: string, authorDto: AuthorDto) {
    return await this.authorService.updateAuthor(id, authorDto);
  }

  @RolesGuard(Role.Admin)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteAuthor(@Param('id') id: string): Promise<AuthorDto> {
    return await this.authorService.deleteAuthor(id);
  }
}
