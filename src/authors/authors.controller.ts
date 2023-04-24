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
import { Roles } from 'src/auth/roles-guard/roles.decorator';
import { Role } from 'src/auth/roles-guard/roles.enum';
import { RolesGuard } from 'src/auth/roles-guard/role.guard';

@Controller('api/authors')
export class AuthorsController {
  constructor(private readonly authorService: AuthorsService) {}

  @Get()
  async getAll(): Promise<AuthorDto[]> {
    return await this.authorService.getAllAuthors();
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async getOne(@Param('id') id: string): Promise<AuthorDto> {
    return await this.authorService.getAuthor(id);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async createAuthor(
    @Body() createAuthorDto: CreateAuthorDto,
  ): Promise<AuthorDto> {
    return await this.authorService.createAuthor(createAuthorDto);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async updateAuthor(@Param('id') id: string, authorDto: AuthorDto) {
    return await this.authorService.updateAuthor(id, authorDto);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async deleteAuthor(@Param('id') id: string): Promise<AuthorDto> {
    return await this.authorService.deleteAuthor(id);
  }
}
