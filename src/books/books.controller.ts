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
import { RolesGuard } from 'src/auth/roles-guard/roles.decorator';
import { Role } from 'src/auth/roles-guard/roles.enum';

@Controller('api/books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @RolesGuard(Role.User)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(): Promise<BookDto[]> {
    return await this.booksService.getAllBooks();
  }

  @RolesGuard(Role.User)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: string): Promise<BookDto> {
    return await this.booksService.getBook(id);
  }

  @RolesGuard(Role.Admin)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateBook(@Param('id') id: string, @Body() bookDto: BookDto) {
    return await this.booksService.updateBook(id, bookDto);
  }

  @RolesGuard(Role.Admin)
  @UseGuards(JwtAuthGuard)
  @Post()
  async createBook(@Body() createBookDto: CreateBookDto): Promise<BookDto> {
    return await this.booksService.createBook(createBookDto);
  }

  @RolesGuard(Role.Admin)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteBook(@Param('id') id: string) {
    return await this.booksService.deleteBook(id);
  }
}
