import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDto } from './dto/book.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-guard/roles.decorator';
import { Role } from 'src/auth/roles-guard/roles.enum';
import { RolesGuard } from 'src/auth/roles-guard/role.guard';

@Controller('api/books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getAll(): Promise<BookDto[]> {
    return await this.booksService.getAllBooks();
  }

  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async getOne(@Param('id') id: string): Promise<BookDto> {
    return await this.booksService.getBook(id);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async updateBook(@Param('id') id: string, @Body() bookDto: BookDto) {
    return await this.booksService.updateBook(id, bookDto);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async createBook(@Body() createBookDto: CreateBookDto): Promise<BookDto> {
    return await this.booksService.createBook(createBookDto);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async deleteBook(@Param('id') id: string) {
    return await this.booksService.deleteBook(id);
  }
}
