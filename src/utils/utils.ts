import { AuthorDto } from '../authors/dto/author.dto';
import { AuthorEntity } from '../authors/entity/author.entity';
import { BookDto } from '../books/dto/book.dto';
import { BookEntity } from '../books/entity/book.entity';
import { GenreDto } from '../genres/dto/genre.dto';
import { GenreEntity } from '../genres/entity/genre.entity';
import { UserDto } from '../users/dto/user.dto';
import { UserEntity } from '../users/entity/user.entity';
import * as bcrypt from 'bcrypt';

export const toBookDto = (data: BookEntity): BookDto => {
  const { id, name, year, genre, authors, publisher, bookFileId } = data;
  let bookDto: BookDto = {
    id,
    name,
    year,
    genre: genre ? toGenreDto(genre) : null,
    publisher,
    bookFileId,
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

export const toUserDto = (data: UserEntity): UserDto => {
  const { id, username, roles } = data;
  const userDto: UserDto = {
    id,
    username,
    roles,
  };
  return userDto;
};

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (
  userPassword: string,
  currentPassword: string,
): Promise<Boolean> => {
  return await bcrypt.compare(currentPassword, userPassword);
};
