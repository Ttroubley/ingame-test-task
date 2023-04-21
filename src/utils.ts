import { AuthorDto } from './authors/dto/author.dto';
import { AuthorEntity } from './authors/entity/author.entity';
import { BookDto } from './books/dto/book.dto';
import { BookEntity } from './books/entity/book.entity';
import { GenreDto } from './genres/dto/genre.dto';
import { GenreEntity } from './genres/entity/genre.entity';

export const toBookDto = (data: BookEntity): BookDto => {
  const { id, name, year, genre, authors, publisher } = data;
  let bookDto: BookDto = {
    id,
    name,
    year,
    genre: genre ? toGenreDto(genre) : null,
    publisher,
  };

  if (authors) {
    bookDto = {
      ...bookDto,
      authors: authors.map((author) => toAuthorDto(author)),
    };
  }
  return bookDto;
};

export const toAuthorDto = (data: AuthorEntity): AuthorDto => {
  const { id, fullName, birthdate } = data;
  const authorDto: AuthorDto = {
    id,
    fullName,
    birthdate,
  };
  return authorDto;
};

export const toGenreDto = (data: GenreEntity): GenreDto => {
  const { id, name } = data;
  const genreDto: GenreDto = {
    id,
    name,
  };
  return genreDto;
};
