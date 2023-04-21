import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookEntity } from './entity/book.entity';
import { BookDto } from './dto/book.dto';
import { toAuthorDto, toBookDto, toGenreDto } from 'src/utils';
import { CreateBookDto } from './dto/create-book.dto';
import { GenresService } from 'src/genres/genres.service';
import { AuthorDto } from 'src/authors/dto/author.dto';
import { AuthorsService } from 'src/authors/authors.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
    private readonly genreService: GenresService,
    private readonly authorService: AuthorsService,
  ) {}

  async getAllBooks(): Promise<BookDto[]> {
    const books: BookEntity[] = await this.bookRepository.find();
    return books.map((book) => toBookDto(book));
  }

  async getBook(id: number): Promise<BookDto> {
    const book: BookEntity = await this.bookRepository.findOne({
      where: { id },
    });
    if (!book) {
      throw new HttpException('Book not found', HttpStatus.BAD_REQUEST);
    }
    return toBookDto(book);
  }

  async createBook(createBookDto: CreateBookDto) {
    const { name, year, genre, publisher, authors } = createBookDto;
    let book: BookEntity = this.bookRepository.create({
      name,
      year,
      publisher,
      genre,
    });

    if (authors) {
      const authorsDto: AuthorDto[] = await Promise.all(
        authors.map(
          async (author) => await this.authorService.getAuthor(author.id),
        ),
      );
      book = {
        ...book,
        authors: authorsDto,
      };
    }
    return toBookDto(book);
  }

  // async update(bookDto: BookDto): Promise<void> {
  //   const { id, name, genre, publisher, year, authors } = bookDto;
  //   await this.bookRepository.update(id, book);
  // }

  async deleteBook(id: number): Promise<void> {
    const book: BookEntity = await this.bookRepository.findOne({
      where: { id },
    });
    if (!book) {
      throw new HttpException('Book doesnt exists', HttpStatus.BAD_REQUEST);
    }
    await this.bookRepository.delete(id);
  }
}
