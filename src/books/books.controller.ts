import { Controller, Get, Param, Body, Post, Delete } from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDto } from './dto/book.dto';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('api/books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async getAll(): Promise<BookDto[]> {
    return await this.booksService.getAllBooks();
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<BookDto> {
    return await this.booksService.getBook(id);
  }

  @Post()
  async createBook(@Body() createBookDto: CreateBookDto): Promise<BookDto> {
    return await this.booksService.createBook(createBookDto);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: number) {
    return await this.booksService.deleteBook(id);
  }
}
