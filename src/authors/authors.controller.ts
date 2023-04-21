import { Controller, Post, Get, Param, Body, Delete } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorDto } from './dto/author.dto';
import { CreateAuthorDto } from './dto/create-author.dto';

@Controller('api/authors')
export class AuthorsController {
  constructor(private readonly authorService: AuthorsService) {}

  @Get()
  async getAll(): Promise<AuthorDto[]> {
    return await this.authorService.getAllAuthors();
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<AuthorDto> {
    return await this.authorService.getAuthor(id);
  }

  @Post()
  async createAuthor(
    @Body() createAuthorDto: CreateAuthorDto,
  ): Promise<AuthorDto> {
    return await this.authorService.createAuthor(createAuthorDto);
  }

  @Delete(':id')
  async deleteAuthor(@Param('id') id: number): Promise<AuthorDto> {
    return await this.authorService.deleteAuthor(id);
  }
}
